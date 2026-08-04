import { Router } from "express";
import { register, login, logout, refresh, requestOtp, verifyOtp, getMe, updateMe } from "../controllers/authController";
import { googleAuthLogin } from "../controllers/googleAuthController";
import { authRateLimiter } from "../middlewares/securityMiddleware";
import { protect } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/zodValidation";
import { registerSchema, loginSchema, requestOtpSchema, verifyOtpSchema } from "../schemas/authSchemas";

const router = Router();

// Rate limiting active on authentication endpoints to prevent brute-force
router.post("/register", authRateLimiter, validate(registerSchema), register);
router.post("/login", authRateLimiter, validate(loginSchema), login);
router.post("/google", authRateLimiter, googleAuthLogin);
router.post("/logout", logout);
router.post("/refresh", refresh);

// Protected routes
router.get("/me", protect, getMe);
router.patch("/me", protect, updateMe);

// OTP routes
router.post("/request-otp", authRateLimiter, validate(requestOtpSchema), requestOtp);
router.post("/verify-otp", validate(verifyOtpSchema), verifyOtp);

export default router;
