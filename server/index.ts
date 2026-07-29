import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

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
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/cibil", cibilRoutes);
app.use("/api/v1/properties", propertyRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/crm", crmRoutes);
app.use("/api/v1/settings", settingsRoutes);

// Health check endpoint
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Error handler (LAST)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[SERVER] Enterprise Express CRM Backend running on port ${PORT}`);
});
