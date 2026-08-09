import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface ISmsLog extends MongooseDocument {
  userId?: Schema.Types.ObjectId;
  loanId?: Schema.Types.ObjectId;
  phone: string;
  templateId: string;
  messageText: string;
  sentAt: Date;
  providerResponse?: string;
  status: "SENT" | "DELIVERED" | "FAILED";
  createdAt: Date;
  updatedAt: Date;
}

const SmsLogSchema = new Schema<ISmsLog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    loanId: { type: Schema.Types.ObjectId, ref: "Loan" },
    phone: { type: String, required: true, index: true },
    templateId: { type: String, required: true },
    messageText: { type: String, required: true },
    sentAt: { type: Date, required: true, default: Date.now },
    providerResponse: { type: String },
    status: { 
      type: String, 
      enum: ["SENT", "DELIVERED", "FAILED"], 
      default: "SENT" 
    },
  },
  { timestamps: true }
);

export const SmsLogModel = model<ISmsLog>("SmsLog", SmsLogSchema);
