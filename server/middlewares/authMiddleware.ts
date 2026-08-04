import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./errorMiddleware";
import { UserModel } from "../models/User";
import { AdminModel } from "../models/Admin";
import { AdminAssistantModel } from "../models/AdminAssistant";
import { logger } from "../utils/logger";

// Validate JWT secrets are set — fail hard at startup if not
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!JWT_SECRET) {
  throw new Error("[FATAL] JWT_SECRET environment variable is not set. Server cannot start.");
}
if (!JWT_REFRESH_SECRET) {
  throw new Error("[FATAL] JWT_REFRESH_SECRET environment variable is not set. Server cannot start.");
}

export type UserRole = "super_admin" | "assistant_admin" | "customer";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
    permissions?: string[];
    fullName?: string;
  };
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    // 1) Extract token from Authorization header or HttpOnly cookie
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return next(new AppError("You are not logged in. Please log in to get access.", 401));
    }

    // 2) Verify token signature and expiry
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET!);
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        return next(new AppError("Your session has expired. Please log in again.", 401));
      }
      return next(new AppError("Invalid session token. Please log in again.", 401));
    }

    // 3) Verify user still exists in the database
    let currentUser: any;
    if (decoded.role === "super_admin") {
      currentUser = await AdminModel.findById(decoded.id).select("+status +failedLoginAttempts +lockoutUntil");
    } else if (decoded.role === "assistant_admin") {
      currentUser = await AdminAssistantModel.findById(decoded.id).select("+status");
    } else {
      currentUser = await UserModel.findById(decoded.id).select("+status +lockoutUntil");
    }

    if (!currentUser) {
      return next(new AppError("The account for this session no longer exists.", 401));
    }

    // 4) Check account status
    if (currentUser.status === "suspended") {
      logger.warn("Suspended account access attempt", { userId: decoded.id, role: decoded.role });
      return next(new AppError("Your account has been suspended. Please contact support.", 403));
    }

    // 5) Check lockout
    if (currentUser.lockoutUntil && new Date(currentUser.lockoutUntil) > new Date()) {
      const unlockTime = new Date(currentUser.lockoutUntil).toLocaleTimeString("en-IN");
      return next(new AppError(`Account is locked due to too many failed attempts. Try again after ${unlockTime}.`, 403));
    }

    // 6) Grant access
    req.user = {
      id: currentUser._id.toString(),
      email: currentUser.email || currentUser.mobile || "",
      role: currentUser.role,
      fullName: currentUser.fullName,
      ...(currentUser.role === "assistant_admin" ? { permissions: currentUser.permissions } : {}),
    };

    next();
  } catch (error) {
    next(error);
  }
};

// ─── ROLE RESTRICTION ─────────────────────────────────────────────────────────
export const restrictTo = (...roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      logger.warn("Unauthorized access attempt", {
        userId: req.user?.id,
        role: req.user?.role,
        required: roles,
        path: req.path,
      });
      return next(new AppError("You do not have permission to perform this action.", 403));
    }
    next();
  };
};

// ─── PERMISSION CHECK (for Assistant Admins) ──────────────────────────────────
export const requirePermission = (permission: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("Authentication required.", 401));
    }

    // Super admins bypass all permission checks
    if (req.user.role === "super_admin") return next();

    if (req.user.role === "assistant_admin" && req.user.permissions?.includes(permission)) {
      return next();
    }

    logger.warn("Permission denied", {
      userId: req.user.id,
      role: req.user.role,
      requiredPermission: permission,
      path: req.path,
    });
    return next(new AppError(`Forbidden: Missing required permission '${permission}'.`, 403));
  };
};

// ─── CUSTOMER OWNERSHIP GUARD ─────────────────────────────────────────────────
// Middleware that allows admins through but blocks customers from viewing other users' data
export const ownerOrAdmin = (getResourceUserId: (req: AuthRequest) => string | undefined) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return next(new AppError("Authentication required.", 401));
    if (req.user.role === "super_admin" || req.user.role === "assistant_admin") return next();

    const resourceUserId = getResourceUserId(req);
    if (!resourceUserId || resourceUserId !== req.user.id) {
      return next(new AppError("You are not authorized to access this resource.", 403));
    }

    next();
  };
};

export { JWT_SECRET, JWT_REFRESH_SECRET };
