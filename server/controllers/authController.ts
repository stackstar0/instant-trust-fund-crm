import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { UserModel } from "../models/User";
import { AdminModel } from "../models/Admin";
import { AdminAssistantModel } from "../models/AdminAssistant";
import { RefreshTokenModel } from "../models/RefreshToken";
import { LoginHistoryModel } from "../models/LoginHistory";
import { AuditLogModel } from "../models/AuditLog";
import { OTPModel } from "../models/OTP";
import { AppError } from "../middlewares/errorMiddleware";

const JWT_SECRET = process.env.JWT_SECRET || "super-secure-jwt-secret-key-101";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "super-secure-refresh-token-secret-key-202";

// Helper to sign access and refresh tokens
const signTokens = (id: string, role: string) => {
  const accessToken = jwt.sign({ id, role }, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id, role }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

// Helper to set cookie headers on response
const setTokenCookies = (res: Response, accessToken: string, refreshToken: string) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000, // 15 minutes
    path: "/"
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/"
  });
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullName, email, mobile, password, referralCode } = req.body;

    if (!fullName || (!email && !mobile) || !password) {
      return next(new AppError("Please provide fullName, password, and either email or mobile number.", 400));
    }

    // Check if user already exists
    if (email) {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) return next(new AppError("Email address already registered.", 400));
    }
    if (mobile) {
      const existingUser = await UserModel.findOne({ mobile });
      if (existingUser) return next(new AppError("Mobile number already registered.", 400));
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await UserModel.create({
      fullName,
      email: email ? email.toLowerCase() : undefined,
      mobile,
      passwordHash,
      referralCode,
    });

    const { accessToken, refreshToken } = signTokens(newUser._id.toString(), "customer");
    
    // Save refresh token in DB
    await RefreshTokenModel.create({
      token: refreshToken,
      userId: newUser._id.toString(),
      role: "customer",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    setTokenCookies(res, accessToken, refreshToken);

    await AuditLogModel.create({
      action: "REGISTER",
      actorId: newUser._id.toString(),
      actorEmail: newUser.email || newUser.mobile || "",
      actorRole: "customer",
      ipAddress: req.ip,
      device: req.headers["user-agent"]
    });

    res.status(201).json({
      status: "success",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        mobile: newUser.mobile,
        role: newUser.role
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { loginId, password } = req.body; // loginId can be email or mobile

    if (!loginId || !password) {
      return next(new AppError("Please enter your email/mobile and password.", 400));
    }

    const queryId = loginId.trim().toLowerCase();

    // 1) Find user/admin in collections
    let foundUser: any;
    let role: "super_admin" | "assistant_admin" | "customer" = "customer";

    // Check Super Admin
    foundUser = await AdminModel.findOne({ email: queryId });
    if (foundUser) {
      role = "super_admin";
    } else {
      // Check Assistant Admin
      foundUser = await AdminAssistantModel.findOne({ email: queryId });
      if (foundUser) {
        role = "assistant_admin";
      } else {
        // Check standard User
        foundUser = await UserModel.findOne({
          $or: [{ email: queryId }, { mobile: loginId }]
        });
      }
    }

    if (!foundUser) {
      await LoginHistoryModel.create({
        email: loginId,
        status: "failed",
        reason: "User not found",
        ipAddress: req.ip,
        device: req.headers["user-agent"]
      });
      return next(new AppError("Incorrect email/mobile or password.", 401));
    }

    if (foundUser.status === "suspended") {
      return next(new AppError("Your account has been suspended.", 403));
    }

    // 2) Verify password
    const isMatch = await bcrypt.compare(password, foundUser.passwordHash);
    if (!isMatch) {
      await LoginHistoryModel.create({
        userId: foundUser._id.toString(),
        email: loginId,
        role,
        status: "failed",
        reason: "Password mismatch",
        ipAddress: req.ip,
        device: req.headers["user-agent"]
      });
      return next(new AppError("Incorrect email/mobile or password.", 401));
    }

    // 3) Login Success - Sign tokens & track login history
    const { accessToken, refreshToken } = signTokens(foundUser._id.toString(), role);

    await RefreshTokenModel.create({
      token: refreshToken,
      userId: foundUser._id.toString(),
      role,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    setTokenCookies(res, accessToken, refreshToken);

    await LoginHistoryModel.create({
      userId: foundUser._id.toString(),
      email: loginId,
      role,
      status: "success",
      ipAddress: req.ip,
      device: req.headers["user-agent"]
    });

    res.status(200).json({
      status: "success",
      user: {
        id: foundUser._id,
        fullName: foundUser.fullName,
        email: foundUser.email,
        mobile: foundUser.mobile,
        role: foundUser.role,
        ...(foundUser.permissions ? { permissions: foundUser.permissions } : {})
      }
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      await RefreshTokenModel.deleteOne({ token: refreshToken });
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({
      status: "success",
      message: "Logged out successfully."
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return next(new AppError("Access Denied: Refresh token not found.", 401));
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    } catch (err) {
      return next(new AppError("Access Denied: Invalid or expired refresh token.", 401));
    }

    // Verify token exists in database (Refresh Token Rotation)
    const tokenDoc = await RefreshTokenModel.findOne({ token: refreshToken });
    if (!tokenDoc) {
      // Invalidate all tokens for this user if token reuse is detected
      await RefreshTokenModel.deleteMany({ userId: decoded.id });
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return next(new AppError("Security alert: Refresh token reuse detected. Log in again.", 401));
    }

    // Rotate refresh token
    await RefreshTokenModel.deleteOne({ token: refreshToken });

    const tokens = signTokens(decoded.id, decoded.role);
    
    await RefreshTokenModel.create({
      token: tokens.refreshToken,
      userId: decoded.id,
      role: decoded.role,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    setTokenCookies(res, tokens.accessToken, tokens.refreshToken);

    res.status(200).json({
      status: "success",
      role: decoded.role
    });
  } catch (error) {
    next(error);
  }
};

export const requestOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { contact } = req.body; // Can be email or phone
    if (!contact) {
      return next(new AppError("Please provide a contact number or email.", 400));
    }

    // Generate random 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const isEmail = contact.includes("@");
    if (isEmail) {
      await OTPModel.create({ email: contact, code });
      console.log(`[OTP] Sent to email ${contact}: ${code}`); // Log to console (SMTP integration setup placeholder)
    } else {
      await OTPModel.create({ mobile: contact, code });
      console.log(`[OTP] Sent to mobile ${contact}: ${code}`); // Log to console (SMS gateway integration setup placeholder)
    }

    res.status(200).json({
      status: "success",
      message: "OTP sent successfully (Simulated in logs)."
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { contact, code } = req.body;
    if (!contact || !code) {
      return next(new AppError("Please provide contact and OTP code.", 400));
    }

    const isEmail = contact.includes("@");
    const otpDoc = await OTPModel.findOne(
      isEmail ? { email: contact, code } : { mobile: contact, code }
    );

    if (!otpDoc) {
      return next(new AppError("Incorrect or expired OTP code.", 400));
    }

    // Delete OTP once verified
    await OTPModel.deleteOne({ _id: otpDoc._id });

    res.status(200).json({
      status: "success",
      message: "OTP verified successfully."
    });
  } catch (error) {
    next(error);
  }
};
