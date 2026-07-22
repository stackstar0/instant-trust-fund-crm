import { Router } from "express";
import { register, login, logout, refresh, requestOtp, verifyOtp } from "../controllers/authController";
import { authRateLimiter } from "../middlewares/securityMiddleware";

const router = Router();

// Rate limiting active on authentication endpoints to prevent brute-force
router.post("/register", authRateLimiter, register);
router.post("/login", authRateLimiter, login);
router.post("/logout", logout);
router.post("/refresh", refresh);

// OTP routes
router.post("/request-otp", authRateLimiter, requestOtp);
router.post("/verify-otp", verifyOtp);

export default router;
