import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface IAdmin extends MongooseDocument {
  fullName: string;
  email: string;
  mobile?: string;
  passwordHash: string;
  role: "super_admin";
  status: "active" | "suspended";
  // Security
  failedLoginAttempts: number;
  lockoutUntil?: Date;
  lastLoginAt?: Date;
  lastLoginIp?: string;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  // Password reset
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    mobile: { type: String, unique: true, sparse: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, default: "super_admin", enum: ["super_admin"], immutable: true },
    status: { type: String, default: "active", enum: ["active", "suspended"] },
    // Security
    failedLoginAttempts: { type: Number, default: 0, select: false },
    lockoutUntil: { type: Date, select: false },
    lastLoginAt: { type: Date },
    lastLoginIp: { type: String, select: false },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String, select: false },
    // Password reset
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
  },
  { timestamps: true }
);

export const AdminModel = model<IAdmin>("Admin", AdminSchema);
