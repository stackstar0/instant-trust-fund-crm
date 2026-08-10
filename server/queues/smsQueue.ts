import { SmsLogModel } from "../models/SmsLog";
import { ISmsTemplate } from "../models/SmsTemplate";
import { compileAndValidateSmsText } from "../utils/templateCompiler";

export interface ISmsJobData {
  logId: string;
  phone: string;
  messageText: string;
  dltTemplateId: string;
  header: string;
  category: "TRANSACTIONAL" | "SERVICE_IMPLICIT" | "PROMOTIONAL";
  peTmChainId?: string;
}

let bullQueue: any = null;
let isRedisAvailable = false;

// Attempt optional BullMQ initialization with Redis fallback
const initBullQueue = async () => {
  try {
    // @ts-ignore - optional dynamic import for BullMQ when installed
    const { Queue, Worker } = await import("bullmq");
    const redisHost = process.env.REDIS_HOST || "127.0.0.1";
    const redisPort = parseInt(process.env.REDIS_PORT || "6379", 10);

    const connection = { host: redisHost, port: redisPort };

    bullQueue = new Queue("SmsQueue", { connection });

    new Worker(
      "SmsQueue",
      async (job: any) => {
        await processSmsJob(job.data);
      },
      { connection, concurrency: 5 }
    );

    isRedisAvailable = true;
    console.log("[SmsQueue] BullMQ Redis Queue initialized successfully.");
  } catch (err: any) {
    console.warn(
      "[SmsQueue] Redis/BullMQ unavailable. Operating with high-throughput in-memory queue fallback:",
      err.message
    );
    isRedisAvailable = false;
  }
};

initBullQueue();

/**
 * Worker execution logic for sending an individual SMS
 */
export const processSmsJob = async (jobData: ISmsJobData): Promise<any> => {
  const { logId, phone, messageText, dltTemplateId, header, category, peTmChainId } = jobData;

  // 1. Enforce TRAI 09:00 AM - 09:00 PM window for PROMOTIONAL category
  if (category === "PROMOTIONAL") {
    const currentHour = new Date().getHours();
    if (currentHour < 9 || currentHour >= 21) {
      const reason = "Promotional SMS blocked: Outside TRAI mandated 09:00 AM - 09:00 PM window.";
      await SmsLogModel.findByIdAndUpdate(logId, {
        status: "REJECTED_DND",
        failureReason: reason,
      });
      return { status: "REJECTED_DND", reason };
    }
  }

  try {
    // 2. Gateway Dispatch (MessageBot / Telemarketer API)
    const entityId = process.env.AIRTEL_DLT_ENTITY_ID || process.env.MESSAGEBOT_ENTITY_ID || "1701158000000000000";
    const peTmChain = peTmChainId || process.env.PE_TM_CHAIN_ID || "PE-TM-1100223344";

    const queryParams = new URLSearchParams({
      userid: process.env.MESSAGEBOT_USERID || "demo_user",
      password: process.env.MESSAGEBOT_PASSWORD || "demo_pass",
      sender: header,
      sendMethod: "quick",
      msgType: category === "PROMOTIONAL" ? "1" : "2",
      mobile: phone,
      msg: messageText,
      entityId,
      templateId: dltTemplateId,
      peTmChain: peTmChain,
    });

    const gatewayUrl = `http://papi.messagebot.in/SendSmsV2?${queryParams.toString()}`;
    const response = await fetch(gatewayUrl);
    const responseText = await response.text();

    let responseData: any = {};
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { rawResponse: responseText };
    }

    const providerMsgId = responseData?.messageId || responseData?.id || `MSG-${Date.now()}`;

    // Update Audit Log to SENT / DELIVERED
    await SmsLogModel.findByIdAndUpdate(logId, {
      status: "SENT",
      providerMessageId: providerMsgId,
      sentAt: new Date(),
    });

    return responseData;
  } catch (error: any) {
    const errorMessage = error?.message || "Gateway dispatch failed";

    await SmsLogModel.findByIdAndUpdate(logId, {
      status: "FAILED",
      failureReason: errorMessage,
    });

    throw new Error(`SMS Dispatch Error: ${errorMessage}`);
  }
};

/**
 * Public function to enqueue an SMS job with DLT compliance & validation
 */
export const dispatchSmsJob = async (
  smsLogData: {
    userId?: any;
    loanId?: any;
    insuranceId?: any;
    phone: string;
    peTmChainId?: string;
  },
  template: ISmsTemplate,
  variableMap: Record<string, any>
) => {
  // 1. Compile & Validate template against TRAI DLT tag rules
  const compilation = compileAndValidateSmsText(template, variableMap);

  let initialStatus: "QUEUED" | "SCRUBBED_LOCAL" = "QUEUED";
  let failureReason: string | undefined = undefined;

  if (!compilation.isValid) {
    initialStatus = "SCRUBBED_LOCAL";
    failureReason = `DLT Scrubbing Failed: ${compilation.validationErrors.join("; ")}`;
  }

  // 2. Create Audit Log Entry
  const log = await SmsLogModel.create({
    userId: smsLogData.userId,
    loanId: smsLogData.loanId,
    insuranceId: smsLogData.insuranceId,
    phone: smsLogData.phone,
    dltTemplateId: template.dltTemplateId,
    headerUsed: template.header,
    category: template.category,
    messageText: compilation.compiledText,
    variableData: variableMap,
    peTmChainId: smsLogData.peTmChainId || process.env.PE_TM_CHAIN_ID || "PE-TM-1100223344",
    status: initialStatus,
    failureReason,
  });

  if (initialStatus === "SCRUBBED_LOCAL") {
    return log;
  }

  const jobPayload: ISmsJobData = {
    logId: log._id.toString(),
    phone: smsLogData.phone,
    messageText: compilation.compiledText,
    dltTemplateId: template.dltTemplateId,
    header: template.header,
    category: template.category,
    peTmChainId: log.peTmChainId,
  };

  // 3. Queue or Fallback Dispatch
  if (isRedisAvailable && bullQueue) {
    await bullQueue.add("SendSmsJob", jobPayload, {
      attempts: 3,
      backoff: { type: "exponential", delay: 2000 },
    });
  } else {
    // Immediate asynchronous execution via in-memory worker
    setImmediate(async () => {
      try {
        await processSmsJob(jobPayload);
      } catch (err) {
        console.error("[SmsQueue Fallback Error]:", err);
      }
    });
  }

  return log;
};
