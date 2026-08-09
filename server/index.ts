import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";

import { connectDB } from "./config/db";
import { errorHandler } from "./middlewares/errorMiddleware";
import { apiRateLimiter } from "./middlewares/securityMiddleware";

// Route imports
import authRoutes from "./routes/authRoutes";
import applicationRoutes from "./routes/applicationRoutes";
import customerRoutes from "./routes/customerRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import cibilRoutes from "./routes/cibilRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import taskRoutes from "./routes/taskRoutes";
import crmRoutes from "./routes/crmRoutes";
import settingsRoutes from "./routes/settingsRoutes";
import importRoutes from "./routes/importRoutes";
import loanRoutes from "./routes/loanRoutes";
import insuranceRoutes from "./routes/insuranceRoutes";
import smsRoutes from "./routes/smsRoutes";
import bhoomiRoutes from "./routes/bhoomiRoutes";

// Seed scripts
import { seedAdmins } from "./scripts/seedSuperAdmin";
import { importCustomerData } from "./scripts/importCustomers";

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and run initial seeds
connectDB().then(async () => {
  console.log("[SERVER] Database connected.");
  try {
    await seedAdmins();
    await importCustomerData();
    
    // Initialize scheduled jobs
    const { initLoanScheduler } = await import("./utils/loanScheduler");
    initLoanScheduler();
  } catch (err) {
    console.error("[SERVER] Seeding/Import error:", err);
  }
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const frontendOrigin = process.env.FRONTEND_URL || "http://localhost:8080";
const allowedOrigins = [
  frontendOrigin,
  "http://localhost:3000",
  "http://127.0.0.1:8080",
  "http://127.0.0.1:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy violation"));
      }
    },
    credentials: true,
  }),
);

app.use(helmet());
app.use(morgan("dev"));
app.use(apiRateLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/cibil", cibilRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/crm", crmRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/import", importRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/insurance", insuranceRoutes);
app.use("/api/sms", smsRoutes);
app.use("/api/bhoomi", bhoomiRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Serve static files from React build
const clientDistPath = path.join(__dirname, "../../client/dist");
app.use(express.static(clientDistPath));

// Fallback to client/dist (if deployed flat, might be ../dist)
const fallbackDistPath = path.join(__dirname, "../dist");
app.use(express.static(fallbackDistPath));

// Catch-all route to return index.html for client-side routing
app.get("*", (req, res) => {
  // First try the typical local dev path, then the deployed path
  res.sendFile(path.join(clientDistPath, "index.html"), (err) => {
    if (err) {
      res.sendFile(path.join(fallbackDistPath, "index.html"));
    }
  });
});

// Error handler (LAST)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[SERVER] Enterprise Express CRM Backend running on port ${PORT}`);
});
