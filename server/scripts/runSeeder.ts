import { connectDB } from "../config/db";
import { seedAdmins } from "./seedSuperAdmin";
import { importCustomerData } from "./importCustomers";
import mongoose from "mongoose";

const runSeeders = async () => {
  try {
    await connectDB();
    console.log("[SEEDER] Connected to Database. Starting seed sequence...");

    await seedAdmins();
    await importCustomerData();

    console.log("[SEEDER] Database seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("[SEEDER] Failed to seed database:", error);
    process.exit(1);
  }
};

runSeeders();
