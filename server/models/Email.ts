import mongoose, { Schema, Document } from "mongoose";

export interface IEmail extends Document {
  recipient: string;
  subject: string;
  body: string;
  type: "OTP" | "VERIFICATION" | "PASSWORD_RESET" | "APPLICATION_UPDATE" | "RECEIPT";
  status: "QUEUED" | "SENT" | "FAILED";
  errorDetails?: string;
  createdAt: Date;
}

const EmailSchema = new Schema<IEmail>(
  {
    recipient: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    type: {
      type: String,
      enum: ["OTP", "VERIFICATION", "PASSWORD_RESET", "APPLICATION_UPDATE", "RECEIPT"],
      default: "APPLICATION_UPDATE",
    },
    status: { type: String, enum: ["QUEUED", "SENT", "FAILED"], default: "QUEUED" },
    errorDetails: { type: String },
  },
  { timestamps: true }
);

export const EmailModel = mongoose.models.Email || mongoose.model<IEmail>("Email", EmailSchema);
