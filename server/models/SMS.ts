import mongoose, { Schema, Document } from "mongoose";

export interface ISMS extends Document {
  recipient: string;
  templateId: string;
  message: string;
  type: "OTP" | "TRANSACTIONAL" | "SERVICE";
  status: "QUEUED" | "SENT" | "FAILED" | "DELIVERED";
  providerMessageId?: string;
  createdAt: Date;
}

const SMSSchema = new Schema<ISMS>(
  {
    recipient: { type: String, required: true },
    templateId: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["OTP", "TRANSACTIONAL", "SERVICE"], default: "TRANSACTIONAL" },
    status: { type: String, enum: ["QUEUED", "SENT", "FAILED", "DELIVERED"], default: "QUEUED" },
    providerMessageId: { type: String },
  },
  { timestamps: true }
);

export const SMSModel = mongoose.models.SMS || mongoose.model<ISMS>("SMS", SMSSchema);
