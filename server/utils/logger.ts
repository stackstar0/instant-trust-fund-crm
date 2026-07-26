import winston from "winston";
import path from "path";

const { combine, timestamp, errors, json, colorize, simple } = winston.format;

const isProduction = process.env.NODE_ENV === "production";

// Define log transports
const transports: winston.transport[] = [
  // Always log errors to a dedicated file
  new winston.transports.File({
    filename: path.join(process.cwd(), "logs", "error.log"),
    level: "error",
    maxsize: 10 * 1024 * 1024, // 10MB
    maxFiles: 5,
  }),
  // All logs
  new winston.transports.File({
    filename: path.join(process.cwd(), "logs", "combined.log"),
    maxsize: 10 * 1024 * 1024, // 10MB
    maxFiles: 10,
  }),
];

// In development, also log to console with color
if (!isProduction) {
  transports.push(
    new winston.transports.Console({
      format: combine(colorize(), simple()),
    })
  );
} else {
  // In production, log JSON to console (for log aggregation tools)
  transports.push(
    new winston.transports.Console({
      format: combine(timestamp(), json()),
    })
  );
}

export const logger = winston.createLogger({
  level: isProduction ? "info" : "debug",
  format: combine(
    errors({ stack: true }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    json()
  ),
  defaultMeta: { service: "ify-crm" },
  transports,
});

// Handle uncaught exceptions and unhandled rejections
export function setupProcessErrorHandlers() {
  process.on("uncaughtException", (error: Error) => {
    logger.error("UNCAUGHT EXCEPTION — shutting down", {
      error: error.message,
      stack: error.stack,
    });
    process.exit(1);
  });

  process.on("unhandledRejection", (reason: unknown) => {
    logger.error("UNHANDLED REJECTION — shutting down", { reason });
    process.exit(1);
  });
}
