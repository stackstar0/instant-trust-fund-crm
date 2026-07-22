import dotenv from "dotenv";
// Load env first
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import bcrypt from "bcryptjs";

import { connectDB } from "./config/db";
import { errorHandler } from "./middlewares/errorMiddleware";
import { apiRateLimiter } from "./middlewares/securityMiddleware";

// Route imports
import authRoutes from "./routes/authRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import taskRoutes from "./routes/taskRoutes";
import crmRoutes from "./routes/crmRoutes";
import settingsRoutes from "./routes/settingsRoutes";

// Model imports (for seeding)
import { AdminModel } from "./models/Admin";
import { AdminAssistantModel } from "./models/AdminAssistant";

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB().then(() => {
  seedStaffAccounts();
});

// 1) Cyber Security & Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS Configuration supporting cookie exchange
const allowedOrigins = ["http://localhost:8080", "http://localhost:5173", "http://127.0.0.1:8080"];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy violation: Access Denied."));
    }
  },
  credentials: true
}));

app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" })); // Request body limit to prevent Denial of Service (DoS)
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Serve uploads directory securely
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Apply rate limiting globally to all API routes
app.use("/api/", apiRateLimiter);

// 2) API Route Map
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/crm", crmRoutes);
app.use("/api/v1/settings", settingsRoutes);

// 3) Global Fallbacks & Error Handler
app.use((req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Resource [${req.method}] ${req.originalUrl} not found on this server.`
  });
});

app.use(errorHandler);

// Helper to seed staff accounts if DB is empty
async function seedStaffAccounts() {
  try {
    const adminCount = await AdminModel.countDocuments();
    if (adminCount === 0) {
      const salt = await bcrypt.genSalt(12);
      const superAdminPassHash = await bcrypt.hash("admin123", salt);
      await AdminModel.create({
        fullName: "R H Adhoni",
        email: "adhoni@instantfunds.com",
        mobile: "9448100213",
        passwordHash: superAdminPassHash,
        role: "super_admin"
      });
      console.log("[SEED] Super Admin account created: adhoni@instantfunds.com / admin123");
    }

    const assistantCount = await AdminAssistantModel.countDocuments();
    if (assistantCount === 0) {
      const salt = await bcrypt.genSalt(12);
      const assistantPassHash = await bcrypt.hash("ayesha123", salt);
      await AdminAssistantModel.create({
        fullName: "Bibi Ayesha",
        email: "ayesha@instantfunds.com",
        mobile: "9845011982",
        passwordHash: assistantPassHash,
        role: "assistant_admin",
        permissions: ["read_customers", "read_applications", "update_applications", "read_tasks", "update_tasks"]
      });
      console.log("[SEED] Assistant Admin account created: ayesha@instantfunds.com / ayesha123");
    }
  } catch (error) {
    console.error("[SEED] Error seeding staff accounts:", error);
  }
}

app.listen(PORT, () => {
  console.log(`[SERVER] Express Server running on port ${PORT}`);
});
