import cron from "node-cron";
import { LoanModel } from "../models/Loan";
import { SmsTemplateModel } from "../models/SmsTemplate";
import { SmsLogModel } from "../models/SmsLog";
import { dispatchSmsJob } from "../queues/smsQueue";

export const startDailyScheduler = () => {
  // Run daily at 08:00 AM IST (02:30 AM UTC)
  cron.schedule(
    "0 8 * * *",
    async () => {
      console.log("[Daily Journey Engine] Starting 08:00 AM IST loan calculation & SMS workflow...");
      try {
        await executeDailyEmiJourney();
        console.log("[Daily Journey Engine] Completed successfully.");
      } catch (error) {
        console.error("[Daily Journey Engine Error]:", error);
      }
    },
    { timezone: "Asia/Kolkata" }
  );
};

export const executeDailyEmiJourney = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startOfDay = new Date(today);
  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  const threeDaysFromNow = new Date(today);
  threeDaysFromNow.setDate(today.getDate() + 3);

  // 1. Fetch Approved DLT Templates
  const reminderTemplate = await SmsTemplateModel.findOne({
    templateName: "EMI_DUE_REMINDER",
    dltStatus: "APPROVED",
  });
  const dueTodayTemplate = await SmsTemplateModel.findOne({
    templateName: "EMI_DUE_TODAY",
    dltStatus: "APPROVED",
  });
  const overdueTemplate = await SmsTemplateModel.findOne({
    templateName: "EMI_OVERDUE",
    dltStatus: "APPROVED",
  });

  // 2. Query Non-Closed Loans
  const activeLoans = await LoanModel.find({ status: { $ne: "CLOSED" } }).populate("userId");

  let processedCount = 0;

  for (const loan of activeLoans) {
    const user = loan.userId as any;
    if (!user || !user.phone) continue;

    let newStatus = loan.status;

    if (loan.outstandingAmount <= 0) {
      newStatus = "CLOSED";
    } else {
      const nextEmi = new Date(loan.nextEmiDate);
      nextEmi.setHours(0, 0, 0, 0);

      const diffTime = nextEmi.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        newStatus = diffDays < -30 ? "DELINQUENT" : "OVERDUE";
      } else if (diffDays <= 3 && diffDays >= 0) {
        newStatus = "DUE_SOON";
      } else {
        newStatus = "ACTIVE";
      }
    }

    if (newStatus !== loan.status) {
      loan.status = newStatus as any;
      await loan.save();
    }

    // 3. Notification Logic with Same-Day Idempotency Check
    const nextEmiDate = new Date(loan.nextEmiDate);
    nextEmiDate.setHours(0, 0, 0, 0);

    const variableMap = {
      customer_name: user.name || user.fullName || "Customer",
      emi_amount: `₹${loan.emiAmount.toLocaleString("en-IN")}`,
      loan_number: loan.loanId,
      due_date: nextEmiDate.toLocaleDateString("en-IN"),
    };

    const smsPayload = {
      userId: user._id,
      loanId: loan._id,
      phone: user.phone,
    };

    let targetTemplate = null;

    // Determine target notification scenario
    if (nextEmiDate.getTime() === threeDaysFromNow.getTime() && reminderTemplate) {
      targetTemplate = reminderTemplate;
    } else if (nextEmiDate.getTime() === today.getTime() && dueTodayTemplate) {
      targetTemplate = dueTodayTemplate;
    } else if (nextEmiDate.getTime() < today.getTime() && loan.outstandingAmount > 0 && overdueTemplate) {
      targetTemplate = overdueTemplate;
    }

    if (targetTemplate) {
      // Idempotency check: Don't resend same template for same loan today
      const alreadySent = await SmsLogModel.findOne({
        loanId: loan._id,
        dltTemplateId: targetTemplate.dltTemplateId,
        createdAt: { $gte: startOfDay, $lte: endOfDay },
      });

      if (!alreadySent) {
        await dispatchSmsJob(smsPayload, targetTemplate, variableMap);
        processedCount++;
      }
    }
  }

  return { processedCount, totalLoans: activeLoans.length };
};
