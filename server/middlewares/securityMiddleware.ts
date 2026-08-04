import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

// ─── AUTH RATE LIMITER ─────────────────────────────────────────────────────
// Strict limiter for login/register/OTP to prevent brute force
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 auth attempts per window per IP
  skipSuccessfulRequests: true, // only count failed requests
  message: {
    status: 429,
    message: "Too many authentication attempts from this IP. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    logger.warn("Auth rate limit exceeded", { ip: req.ip, path: req.path });
    res.status(429).json({
      status: "error",
      message: "Too many authentication attempts from this IP. Please try again after 15 minutes.",
    });
  },
});

// ─── OTP RATE LIMITER ──────────────────────────────────────────────────────
// Very strict — prevent OTP spam / SMS bombing
export const otpRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3, // max 3 OTP requests per 10 minutes per IP
  message: {
    status: 429,
    message: "Too many OTP requests. Please wait 10 minutes before requesting another OTP.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    logger.warn("OTP rate limit exceeded", { ip: req.ip, body: req.body?.contact });
    res.status(429).json({
      status: "error",
      message: "Too many OTP requests. Please wait 10 minutes before requesting another OTP.",
    });
  },
});

// ─── PAYMENT RATE LIMITER ──────────────────────────────────────────────────
export const paymentRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { status: 429, message: "Too many payment requests. Please slow down." },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── GENERAL API RATE LIMITER ──────────────────────────────────────────────
export const apiRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 120, // 120 req/min per IP
  message: {
    status: 429,
    message: "Too many requests. Please try again in a minute.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── NOSQL INJECTION SANITIZER ─────────────────────────────────────────────
// Strips MongoDB operators like $where, $gt from request body/query/params
export const mongoSanitizeMiddleware = mongoSanitize({
  replaceWith: "_",
  onSanitize: ({ key, req }: { key: string; req: Request }) => {
    logger.warn("NoSQL injection attempt sanitized", {
      ip: req.ip,
      key,
      path: req.path,
    });
  },
});

// ─── HTTP PARAMETER POLLUTION PROTECTION ──────────────────────────────────
export const hppMiddleware = hpp({
  whitelist: ["status", "productKind", "sort"], // allow multiple values for these query params
});

// ─── SECURITY HEADERS MIDDLEWARE ───────────────────────────────────────────
// Additional CSP and security headers beyond what Helmet provides
export const additionalSecurityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Prevent browsers from caching sensitive API responses
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");

  // Prevent MIME type sniffing (already in Helmet but explicit)
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Referrer policy for privacy
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Permissions policy — restrict dangerous browser features
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(self), payment=(self)"
  );

  next();
};

// ─── REQUEST LOGGER ────────────────────────────────────────────────────────
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (req.path.startsWith("/api")) {
      logger.info("API request", {
        method: req.method,
        path: req.path,
        status: res.statusCode,
        duration: `${duration}ms`,
        ip: req.ip,
        userAgent: req.headers["user-agent"],
      });
    }
  });
  next();
};
