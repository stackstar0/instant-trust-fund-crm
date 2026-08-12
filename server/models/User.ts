import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface IUser extends MongooseDocument {
  name: string;
  email?: string;
  phone: string;
  passwordHash?: string;
  role: "User" | "AssistantAdmin" | "Admin";
  panNumber?: string;
  aadhaarNumber?: string;
  address?: string;
  googleId?: string;
  picture?: string;
  dob?: Date;
  referralCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true, alias: "fullName" },
    email: { type: String, trim: true, lowercase: true, sparse: true, unique: true },
    phone: { type: String, required: true, unique: true, index: true, alias: "mobile" },
    passwordHash: { type: String, select: false },
    role: { type: String, enum: ["User", "AssistantAdmin", "Admin"], default: "User" },
    panNumber: { type: String, select: false },
    aadhaarNumber: { type: String, select: false },
    address: { type: String },
    googleId: { type: String, sparse: true },
    picture: { type: String },
    dob: { type: Date },
    referralCode: { type: String, trim: true },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("User", UserSchema);
