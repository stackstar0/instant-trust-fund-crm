import mongoose from "mongoose";
import "dotenv/config";
import { UserModel } from "../models/User";
import { LoanModel } from "../models/Loan";
import { initLoanScheduler } from "../utils/loanScheduler";

const runTests = async () => {
  console.log("=== Running System Verification Suite ===");
  try {
    // 1. MongoDB Connection
    console.log("[1] Testing MongoDB Connection...");
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/trustfunds";
    await mongoose.connect(uri);
    console.log("    ✅ MongoDB Connected.");

    // 2. Read/Write Test
    console.log("[2] Testing MongoDB Read/Write...");
    const testUser = new UserModel({
      name: "Test User",
      email: "test@example.com",
      phone: "9999999999",
      role: "User",
      panNumber: "ABCDE1234F"
    });
    await testUser.save();
    console.log("    ✅ Write successful.");
    
    const readUser = await UserModel.findOne({ phone: "9999999999" });
    if (!readUser) throw new Error("Read failed");
    console.log("    ✅ Read successful.");

    const testLoan = new LoanModel({
      loanId: "TEST-LN-001",
      userId: readUser._id,
      loanType: "Personal Loan",
      principalAmount: 50000,
      interestRate: 12,
      tenureMonths: 12,
      startDate: new Date(),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      emiAmount: 4500,
      emiDueDate: 5,
      outstandingAmount: 50000,
      nextEmiDate: new Date(),
      status: "ACTIVE"
    });
    await testLoan.save();
    console.log("    ✅ Loan Write successful.");

    // 3. Cleanup Test Data
    await UserModel.deleteOne({ _id: testUser._id });
    await LoanModel.deleteOne({ _id: testLoan._id });
    console.log("    ✅ Cleanup successful.");

    // 4. Test Loan Scheduler Init
    console.log("[3] Testing Loan Scheduler Initialization...");
    initLoanScheduler();
    console.log("    ✅ Scheduler initialized without errors.");

    console.log("=== Verification Suite Passed Successfully ===");
  } catch (error) {
    console.error("❌ Verification failed:", error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

runTests();
