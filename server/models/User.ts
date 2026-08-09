import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface IUser extends MongooseDocument {
  name: string;
  email?: string;
  phone: string;
  role: "User" | "AssistantAdmin" | "Admin";
  panNumber?: string;
  aadhaarNumber?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, sparse: true, unique: true },
    phone: { type: String, required: true, unique: true, index: true },
    role: { type: String, enum: ["User", "AssistantAdmin", "Admin"], default: "User" },
    panNumber: { type: String, select: false },
    aadhaarNumber: { type: String, select: false },
    address: { type: String },
  },
  { timestamps: true }
);

export const UserModel = model<IUser>("User", UserSchema);
