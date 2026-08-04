import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import { UserModel } from "../models/User";
import { AdminModel } from "../models/Admin";
import { AdminAssistantModel } from "../models/AdminAssistant";
import { RefreshTokenModel } from "../models/RefreshToken";
import { LoginHistoryModel } from "../models/LoginHistory";
import { AppError } from "../middlewares/errorMiddleware";
import jwt from "jsonwebtoken";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET || "super-secure-jwt-secret-key-101";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "super-secure-refresh-token-secret-key-202";

const signTokens = (id: string, role: string) => {
  const accessToken = jwt.sign({ id, role }, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id, role }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

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

export const googleAuthLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;
    if (!token) return next(new AppError("Google token is required.", 400));

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) return next(new AppError("Invalid Google token.", 401));

    const email = payload.email.toLowerCase();

    // 1) Find user/admin in collections
    let foundUser: any = await AdminModel.findOne({ email });
    let role = "super_admin";

    if (!foundUser) {
      foundUser = await AdminAssistantModel.findOne({ email });
      role = "assistant_admin";
    }

    if (!foundUser) {
      foundUser = await UserModel.findOne({ email });
      role = "customer";
      
      // If customer doesn't exist, automatically register them via Google
      if (!foundUser) {
        foundUser = await UserModel.create({
          fullName: payload.name || "Google User",
          email,
          mobile: "", // Empty string since Google doesn't provide it by default
          passwordHash: "", // No password needed for OAuth
        });
      }
    }

    if (foundUser.status === "suspended") {
      return next(new AppError("Your account has been suspended.", 403));
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
      email,
      role,
      status: "success",
      ipAddress: req.ip,
      device: req.headers["user-agent"] || "Google OAuth"
    });

    res.status(200).json({
      status: "success",
      user: {
        id: foundUser._id,
        fullName: foundUser.fullName,
        email: foundUser.email,
        mobile: foundUser.mobile,
        role,
        ...(foundUser.permissions ? { permissions: foundUser.permissions } : {})
      }
    });
  } catch (error) {
    next(error);
  }
};
