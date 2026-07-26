import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface IUser extends MongooseDocument {
  fullName: string;
  email?: string;
  mobile?: string;
  passwordHash: string;
  role: "customer";
  status: "active" | "suspended";
  referralCode?: string;
  // KYC
  kycVerified: boolean;
  kycStatus: "not_started" | "pending" | "verified" | "rejected";
  // Email verification
  emailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  // Phone verification
  phoneVerified: boolean;
  // Password reset
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  // Security
  failedLoginAttempts: number;
  lockoutUntil?: Date;
  lastLoginAt?: Date;
  lastLoginIp?: string;
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    mobile: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      index: true,
      match: [/^[6-9]\d{9}$/, "Please provide a valid 10-digit Indian mobile number"],
    },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, default: "customer", enum: ["customer"], immutable: true },
    status: { type: String, default: "active", enum: ["active", "suspended"] },
    referralCode: { type: String, trim: true, uppercase: true },
    // KYC
    kycVerified: { type: Boolean, default: false },
    kycStatus: {
      type: String,
      default: "not_started",
      enum: ["not_started", "pending", "verified", "rejected"],
    },
    // Email verification
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String, select: false },
    emailVerificationExpires: { type: Date, select: false },
    // Phone verification
    phoneVerified: { type: Boolean, default: false },
    // Password reset
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
    // Security
    failedLoginAttempts: { type: Number, default: 0, select: false },
    lockoutUntil: { type: Date, select: false },
    lastLoginAt: { type: Date },
    lastLoginIp: { type: String, select: false },
  },
  { timestamps: true }
);

// Index for password reset token lookups
UserSchema.index({ passwordResetToken: 1 }, { sparse: true });

export const UserModel = model<IUser>("User", UserSchema);
