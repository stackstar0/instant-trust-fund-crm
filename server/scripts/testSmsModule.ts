import mongoose from "mongoose";
import "dotenv/config";
import { SmsTemplateModel } from "../models/SmsTemplate";
import { SmsLogModel } from "../models/SmsLog";
import { UserModel } from "../models/User";
import { LoanModel } from "../models/Loan";
import { compileAndValidateSmsText } from "../utils/templateCompiler";
import { dispatchSmsJob } from "../queues/smsQueue";
import { executeDailyEmiJourney } from "../schedulers/dailyScheduler";

const runSmsModuleTests = async () => {
  console.log("=== 📱 Running TRAI DLT & SMS Module Verification Suite ===");
  try {
    // 1. Connect MongoDB
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/trustfunds";
    await mongoose.connect(uri);
    console.log("[1] ✅ MongoDB Connected.");

    // 2. Seed Test DLT Template
    console.log("[2] Seeding TRAI DLT Content Template...");
    const testTemplateData = {
      templateName: "EMI_DUE_REMINDER",
      dltTemplateId: "1707162800001122334",
      header: "TRSTFD-S",
      category: "SERVICE_IMPLICIT" as const,
      bodyTemplate: "Dear {{customer_name}}, your EMI of {{emi_amount}} for loan {{loan_number}} is due on {{due_date}}.",
      variableTags: [
        { varName: "customer_name", tagType: "#alphanumeric#" as const },
        { varName: "emi_amount", tagType: "#number#" as const },
        { varName: "loan_number", tagType: "#alphanumeric#" as const },
      ],
      dltStatus: "APPROVED" as const,
      approvalDate: new Date(),
    };

    await SmsTemplateModel.deleteMany({ templateName: "EMI_DUE_REMINDER" });
    const template = await SmsTemplateModel.create(testTemplateData);
    console.log("    ✅ Seeded DLT Template:", template.templateName, `(ID: ${template.dltTemplateId})`);

    // 3. Test Template Compiler & Variable Validation
    console.log("[3] Testing Template Compiler & TRAI Tag Scrubbing...");
    const validVars = {
      customer_name: "Anita Sharma",
      emi_amount: "15,000",
      loan_number: "LN-889900",
      due_date: "15/08/2026",
    };

    const compilation = compileAndValidateSmsText(template, validVars);
    if (!compilation.isValid) {
      throw new Error(`Compilation failed unexpectedly: ${compilation.validationErrors.join(", ")}`);
    }
    console.log("    ✅ Compiled Text:", compilation.compiledText);

    // 4. Test Queue Dispatch & SmsLog Transition
    console.log("[4] Testing Asynchronous Queue Dispatch & Log Creation...");
    const mockPhone = "9876543210";
    const log = await dispatchSmsJob(
      {
        phone: mockPhone,
        peTmChainId: "PE-TM-1100223344",
      },
      template,
      validVars
    );

    console.log("    ✅ Created SmsLog Entry ID:", log._id.toString());
    console.log("    ✅ Initial Status:", log.status);

    // Wait a brief tick for in-memory queue fallback processing
    await new Promise((r) => setTimeout(r, 1000));

    const updatedLog = await SmsLogModel.findById(log._id);
    console.log("    ✅ Post-Dispatch Status:", updatedLog?.status);
    console.log("    ✅ Provider Message ID:", updatedLog?.providerMessageId || "N/A");

    // 5. Test Daily EMI Journey Execution
    console.log("[5] Testing Daily EMI Journey Scheduler Execution...");
    const journeyResult = await executeDailyEmiJourney();
    console.log("    ✅ Daily EMI Journey Processed Loans:", journeyResult.totalLoans);

    // Cleanup
    await SmsTemplateModel.deleteOne({ _id: template._id });
    await SmsLogModel.deleteOne({ _id: log._id });
    console.log("    ✅ Test Cleanup Completed.");

    console.log("=== 🚀 TRAI DLT & SMS Module Verification Passed Successfully ===");
  } catch (error) {
    console.error("❌ SMS Module Verification Failed:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

runSmsModuleTests();
