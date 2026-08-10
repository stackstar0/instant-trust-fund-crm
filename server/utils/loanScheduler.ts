import cron from "node-cron";
import { LoanModel } from "../models/Loan";
import { UserModel } from "../models/User";
import { SmsTemplateModel } from "../models/SmsTemplate";
import { SmsLogModel } from "../models/SmsLog";
import axios from "axios";

export const initLoanScheduler = () => {
  // Run daily at 08:00 AM IST (which is 02:30 AM UTC)
  // Let's use the timezone option in node-cron
  cron.schedule("0 8 * * *", async () => {
    console.log("[CRON] Starting daily loan status and SMS scheduler...");
    try {
      await processLoanStatuses();
      await processAutomatedSms();
      console.log("[CRON] Scheduler run completed successfully.");
    } catch (error) {
      console.error("[CRON] Error during scheduler run:", error);
    }
  }, {
    timezone: "Asia/Kolkata"
  });
};

const processLoanStatuses = async () => {
  const loans = await LoanModel.find({ status: { $ne: "CLOSED" } });
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let updatedCount = 0;

  for (const loan of loans) {
    let newStatus = loan.status;

    if (loan.outstandingAmount <= 0) {
      newStatus = "CLOSED";
    } else {
      const nextEmi = new Date(loan.nextEmiDate);
      nextEmi.setHours(0, 0, 0, 0);
      
      const diffTime = nextEmi.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        // It's overdue
        if (diffDays < -30) {
          newStatus = "DELINQUENT";
        } else {
          newStatus = "OVERDUE";
        }
      } else if (diffDays <= 3 && diffDays >= 0) {
        newStatus = "DUE_SOON";
      } else {
        newStatus = "ACTIVE";
      }
    }

    if (newStatus !== loan.status) {
      loan.status = newStatus as any;
      await loan.save();
      updatedCount++;
    }
  }

  console.log(`[CRON] Updated statuses for ${updatedCount} loans.`);
};

const processAutomatedSms = async () => {
  // Find loans that need reminders
  const targetLoans = await LoanModel.find({
    status: { $in: ["DUE_SOON", "OVERDUE"] },
  }).populate("userId");

  if (targetLoans.length === 0) return;

  // Ideally, you fetch the correct template based on status. For now, fetch a generic one or specific.
  const template = await SmsTemplateModel.findOne({ templateName: "EMI_REMINDER" });
  if (!template) {
    console.log("[CRON] SMS template 'EMI_REMINDER' not found. Skipping SMS.");
    return;
  }

  for (const loan of targetLoans) {
    const user = loan.userId as any;
    if (!user || !user.phone) continue;

    // Interpolate template parameters
    let messageText = template.bodyTemplate
      .replace("{{customer_name}}", user.name)
      .replace("{{emi_amount}}", loan.emiAmount.toString())
      .replace("{{loan_number}}", loan.loanId)
      .replace("{{due_date}}", loan.nextEmiDate.toDateString());

    try {
      // Send SMS via MessageBot
      const response = await axios.get("http://papi.messagebot.in/SendSmsV2", {
        params: {
          userid: process.env.MESSAGEBOT_USERID,
          password: process.env.MESSAGEBOT_PASSWORD,
          sender: process.env.MESSAGEBOT_SENDER_ID,
          sendMethod: "quick",
          msgType: "text",
          mobile: user.phone,
          msg: messageText,
          entityId: template.dltEntityId,
          templateId: template.dltTemplateId
        }
      });

      // Log success
      await SmsLogModel.create({
        userId: user._id,
        loanId: loan._id,
        phone: user.phone,
        templateId: template.dltTemplateId,
        messageText,
        status: "SENT",
        providerResponse: JSON.stringify(response.data)
      });
    } catch (err: any) {
      // Log failure
      await SmsLogModel.create({
        userId: user._id,
        loanId: loan._id,
        phone: user.phone,
        templateId: template.dltTemplateId,
        messageText,
        status: "FAILED",
        providerResponse: err.message
      });
      console.error(`[CRON] Failed to send SMS to ${user.phone}:`, err.message);
    }
  }
};
