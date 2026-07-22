import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface ILoginHistory extends MongooseDocument {
  userId?: string;
  email: string;
  role?: string;
  ipAddress?: string;
  device?: string;
  status: "success" | "failed";
  reason?: string;
  createdAt: Date;
}

const LoginHistorySchema = new Schema<ILoginHistory>(
  {
    userId: { type: String, index: true },
    email: { type: String, required: true, index: true },
    role: { type: String },
    ipAddress: { type: String },
    device: { type: String },
    status: { type: String, required: true, enum: ["success", "failed"] },
    reason: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const LoginHistoryModel = model<ILoginHistory>("LoginHistory", LoginHistorySchema);
