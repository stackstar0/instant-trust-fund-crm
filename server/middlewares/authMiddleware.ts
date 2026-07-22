import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./errorMiddleware";
import { UserModel } from "../models/User";
import { AdminModel } from "../models/Admin";
import { AdminAssistantModel } from "../models/AdminAssistant";

const JWT_SECRET = process.env.JWT_SECRET || "super-secure-jwt-secret-key-101";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: "super_admin" | "assistant_admin" | "customer";
    permissions?: string[];
  };
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    // 1) Get token from header or cookies
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return next(new AppError("You are not logged in. Please log in to get access.", 401));
    }

    // 2) Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        return next(new AppError("Your session has expired. Please log in again.", 401));
      }
      return next(new AppError("Invalid session token. Please log in again.", 401));
    }

    // 3) Check if user/admin/assistant still exists in database
    let currentUser: any;
    if (decoded.role === "super_admin") {
      currentUser = await AdminModel.findById(decoded.id);
    } else if (decoded.role === "assistant_admin") {
      currentUser = await AdminAssistantModel.findById(decoded.id);
    } else {
      currentUser = await UserModel.findById(decoded.id);
    }

    if (!currentUser) {
      return next(new AppError("The user belonging to this token no longer exists.", 401));
    }

    if (currentUser.status === "suspended") {
      return next(new AppError("Your account has been suspended. Please contact support.", 403));
    }

    // 4) Grant access to protected route
    req.user = {
      id: currentUser._id.toString(),
      email: currentUser.email || currentUser.mobile || "",
      role: currentUser.role,
      ...(currentUser.role === "assistant_admin" ? { permissions: currentUser.permissions } : {})
    };

    next();
  } catch (error) {
    next(error);
  }
};

// Middleware to restrict access to specific roles
export const restrictTo = (...roles: Array<"super_admin" | "assistant_admin" | "customer">) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to perform this action.", 403));
    }
    next();
  };
};

// Middleware to restrict based on specific permissions (for assistants)
export const requirePermission = (permission: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("Authentication required.", 401));
    }
    if (req.user.role === "super_admin") {
      return next(); // Super admins bypass all permission checks
    }
    if (req.user.role === "assistant_admin" && req.user.permissions?.includes(permission)) {
      return next();
    }
    return next(new AppError("Forbidden: You do not possess the required permission.", 403));
  };
};
