import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "../config/db";
import { AdminModel } from "../models/Admin";
import { AdminAssistantModel } from "../models/AdminAssistant";

export async function seedAdmins() {
  console.log("[SEED] Initializing Super Admin & Assistant Admin accounts...");
  await connectDB();

  // Super Admin
  const adminEmail = process.env.SUPER_ADMIN_EMAIL || "admin@instanttrustfunds.com";
  const adminPassword = process.env.SUPER_ADMIN_PASSWORD || "AdminPass@2026";

  const existingAdmin = await AdminModel.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    await AdminModel.create({
      fullName: "Super Admin",
      email: adminEmail.toLowerCase(),
      passwordHash,
      role: "super_admin",
      status: "active",
    });
    console.log(`[SEED] Super Admin created: ${adminEmail} (Password: ${adminPassword})`);
  } else {
    console.log(`[SEED] Super Admin already exists: ${adminEmail}`);
  }

  // Assistant Admin
  const assistantEmail = process.env.ASSISTANT_ADMIN_EMAIL || "assistant@instanttrustfunds.com";
  const assistantPassword = process.env.ASSISTANT_ADMIN_PASSWORD || "AssistantPass@2026";

  const existingAssistant = await AdminAssistantModel.findOne({ email: assistantEmail });
  if (!existingAssistant) {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(assistantPassword, salt);

    await AdminAssistantModel.create({
      fullName: "Senior Verification Officer",
      email: assistantEmail.toLowerCase(),
      passwordHash,
      role: "assistant_admin",
      status: "active",
      permissions: [
        "read_customers",
        "read_applications",
        "update_applications",
        "read_tasks",
        "update_tasks",
        "verify_documents",
        "customer_communication",
      ],
    });
    console.log(`[SEED] Assistant Admin created: ${assistantEmail} (Password: ${assistantPassword})`);
  } else {
    console.log(`[SEED] Assistant Admin already exists: ${assistantEmail}`);
  }
}

if (process.argv[1]?.includes("seedSuperAdmin")) {
  seedAdmins()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("[SEED] Seeding error:", err);
      process.exit(1);
    });
}
