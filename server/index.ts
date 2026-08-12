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
import importRoutes from "./routes/import";
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
    const { startDailyScheduler } = await import("./schedulers/dailyScheduler");
    initLoanScheduler();
    startDailyScheduler();
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
  "https://instanttrustfunds.com",
  "https://www.instanttrustfunds.com",
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

// Routes - supports both /api and /api/v1 prefixes for production & hostinger compatibility
app.use(["/api/auth", "/api/v1/auth"], authRoutes);
app.use(["/api/applications", "/api/v1/applications"], applicationRoutes);
app.use(["/api/customers", "/api/v1/customers"], customerRoutes);
app.use(["/api/payments", "/api/v1/payments"], paymentRoutes);
app.use(["/api/cibil", "/api/v1/cibil"], cibilRoutes);
app.use(["/api/properties", "/api/v1/properties"], propertyRoutes);
app.use(["/api/tasks", "/api/v1/tasks"], taskRoutes);
app.use(["/api/crm", "/api/v1/crm"], crmRoutes);
app.use(["/api/settings", "/api/v1/settings"], settingsRoutes);
app.use(["/api/import", "/api/v1/import"], importRoutes);
app.use(["/api/loans", "/api/v1/loans"], loanRoutes);
app.use(["/api/insurance", "/api/v1/insurance"], insuranceRoutes);
app.use(["/api/sms", "/api/v1/sms"], smsRoutes);
app.use(["/api/bhoomi", "/api/v1/bhoomi"], bhoomiRoutes);

// Health check endpoint
app.get(["/api/health", "/api/v1/health"], (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Configure multiple static files lookup paths to avoid 403/404 on different environments
const staticPaths = [
  path.join(__dirname, "../../client/dist"),
  path.join(__dirname, "../dist"),
  path.join(process.cwd(), "dist"),
  path.join(process.cwd(), "client/dist"),
];

staticPaths.forEach((staticPath) => {
  app.use(express.static(staticPath));
});

// Catch-all route to return index.html for client-side routing
app.get(/.*/, (req, res) => {
  let fileSent = false;
  for (const staticPath of staticPaths) {
    const indexPath = path.join(staticPath, "index.html");
    res.sendFile(indexPath, (err) => {
      if (!err) {
        fileSent = true;
      }
    });
    if (fileSent) break;
  }
  // Ultimate fallback if sendFile callbacks fail synchronously (or to prevent unhandled response)
  setTimeout(() => {
    if (!res.headersSent) {
      // Try sending from first path or dynamic resolve
      res.sendFile(path.resolve(staticPaths[0], "index.html"), (err) => {
        if (err && !res.headersSent) {
          res.status(404).send("React application build not found. Please run npm run build.");
        }
      });
    }
  }, 100);
});

// Error handler (LAST)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[SERVER] Enterprise Express CRM Backend running on port ${PORT}`);
});
