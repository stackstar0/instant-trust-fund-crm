import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters long"),
    email: z.string().email("Invalid email format").optional(),
    mobile: z.string().min(10, "Mobile number must be at least 10 digits").max(15).optional(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    referralCode: z.string().optional()
  }).refine(data => data.email || data.mobile, {
    message: "Either email or mobile number must be provided",
    path: ["email"] // Attach error to email field
  })
});

export const loginSchema = z.object({
  body: z.object({
    loginId: z.string().min(3, "Login ID must be provided"),
    password: z.string().min(1, "Password must be provided")
  })
});

export const requestOtpSchema = z.object({
  body: z.object({
    mobile: z.string().min(10, "Valid mobile number required")
  })
});

export const verifyOtpSchema = z.object({
  body: z.object({
    mobile: z.string().min(10, "Valid mobile number required"),
    otp: z.string().length(6, "OTP must be exactly 6 digits")
  })
});
