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
  console.log("[SERVER] Database ready.");
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
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/crm", crmRoutes);
app.use("/api/v1/settings", settingsRoutes);

// Error handler (LAST)
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`[SERVER] Express Server running on port ${PORT}`);
});
