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
  console.log("[SERVER] Database ready. No demo data seeded.");
});

app.listen(PORT, () => {
  console.log(`[SERVER] Express Server running on port ${PORT}`);
});
