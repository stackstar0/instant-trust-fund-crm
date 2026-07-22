import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface IUser extends MongooseDocument {
  fullName: string;
  email?: string;
  mobile?: string;
  passwordHash: string;
  role: "customer";
  status: "active" | "suspended";
  referralCode?: string;
  kycVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      unique: true, 
      sparse: true, 
      trim: true, 
      lowercase: true,
      index: true
    },
    mobile: { 
      type: String, 
      unique: true, 
      sparse: true, 
      trim: true,
      index: true
    },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "customer", enum: ["customer"] },
    status: { type: String, default: "active", enum: ["active", "suspended"] },
    referralCode: { type: String, trim: true },
    kycVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("User", UserSchema);
