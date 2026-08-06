import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
import bhoomiRoutes from "./routes/bhoomiRoutes";

// Seed scripts


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB().then(async () => {
  console.log("[SERVER] Database connected.");
});

// Middlewares
app.set("trust proxy", 1); // Trust first proxy (Nginx) for secure cookies and rate limiting
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
      // Allow specific origins or any localhost port during development
      if (!origin || allowedOrigins.includes(origin) || /^http:\/\/localhost:\d+$/.test(origin) || /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)) {
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
app.use("/api/v1/bhoomi", bhoomiRoutes);

// Health check endpoint
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Serve static React build in production
const clientBuildPath = path.join(__dirname, "../../.output/public");
app.use(express.static(clientBuildPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

// Error handler (LAST)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[SERVER] Enterprise Express CRM Backend running on port ${PORT}`);
});
