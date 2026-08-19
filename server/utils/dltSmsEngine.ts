import { SmsLogModel } from "../models/SmsLog";

export interface IDltSmsParams {
  phone: string;
  dltTemplateId: string;
  messageText: string;
  header: string;
  category: "TRANSACTIONAL" | "SERVICE_IMPLICIT" | "PROMOTIONAL";
  userId?: string;
  customerId?: string;
}

/**
 * Dispatches a POST request to MessageBot API Gateway and logs the transaction in SmsLog.
 */
export async function sendDltSms({
  phone,
  dltTemplateId,
  messageText,
  header,
  category,
  userId,
  customerId,
}: IDltSmsParams) {
  const entityId = process.env.MESSAGEBOT_ENTITY_ID || "1701158000000000000";
  const userIdToken = process.env.MESSAGEBOT_USERID || "demo_user";
  const passwordToken = process.env.MESSAGEBOT_PASSWORD || "demo_pass";
  const peTmChain = process.env.PE_TM_CHAIN_ID || "PE-TM-1100223344";

  // Prepare urlencoded form data for the POST request body
  const formData = new URLSearchParams({
    userid: userIdToken,
    password: passwordToken,
    sender: header,
    sendMethod: "quick",
    msgType: category === "PROMOTIONAL" ? "1" : "2",
    mobile: phone,
    msg: messageText,
    entityId,
    templateId: dltTemplateId,
    peTmChain: peTmChain,
  });

  const gatewayUrl = "http://papi.messagebot.in/SendSmsV2";

  // Create initial log entry in the database
  const log = await SmsLogModel.create({
    userId: userId || undefined,
    customerId: customerId || undefined,
    phone,
    dltTemplateId,
    headerUsed: header,
    category,
    messageText,
    status: "SENT",
    sentAt: new Date(),
  });

  try {
    const response = await fetch(gatewayUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const responseText = await response.text();
    let responseData: any = {};
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { rawResponse: responseText };
    }

    const providerMsgId = responseData?.messageId || responseData?.id || `MSG-${Date.now()}`;
    log.providerMessageId = providerMsgId;
    await log.save();

    return { success: true, providerMsgId };
  } catch (error: any) {
    const errorMessage = error?.message || "POST Request to gateway failed.";
    log.status = "FAILED";
    log.failureReason = errorMessage;
    await log.save();
    return { success: false, error: errorMessage };
  }
}
