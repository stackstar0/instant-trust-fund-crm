import mongoose, { Schema, model, Document as MongooseDocument } from "mongoose";

export interface ISmsLog extends MongooseDocument {
  userId?: mongoose.Types.ObjectId;
  customerId?: mongoose.Types.ObjectId;
  loanId?: mongoose.Types.ObjectId;
  insuranceId?: mongoose.Types.ObjectId;
  phone: string;
  dltTemplateId: string;
  headerUsed: string;
  category: "TRANSACTIONAL" | "SERVICE_IMPLICIT" | "PROMOTIONAL";
  messageText: string;
  variableData?: Map<string, string> | Record<string, any>;
  providerMessageId?: string;
  peTmChainId?: string;
  status: "QUEUED" | "SENT" | "DELIVERED" | "FAILED" | "REJECTED_DND" | "SCRUBBED_LOCAL";
  failureReason?: string;
  sentAt?: Date;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SmsLogSchema = new Schema<ISmsLog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    loanId: { type: Schema.Types.ObjectId, ref: "Loan" },
    insuranceId: { type: Schema.Types.ObjectId, ref: "Insurance" },
    phone: { type: String, required: true, index: true },
    dltTemplateId: { type: String, required: true },
    headerUsed: { type: String, required: true },
    category: { 
      type: String, 
      enum: ["TRANSACTIONAL", "SERVICE_IMPLICIT", "PROMOTIONAL"], 
      required: true 
    },
    messageText: { type: String, required: true },
    variableData: { type: Map, of: String },
    providerMessageId: { type: String },
    peTmChainId: { type: String },
    status: { 
      type: String, 
      enum: ["QUEUED", "SENT", "DELIVERED", "FAILED", "REJECTED_DND", "SCRUBBED_LOCAL"], 
      default: "QUEUED" 
    },
    failureReason: { type: String },
    sentAt: { type: Date },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

export const SmsLogModel = model<ISmsLog>("SmsLog", SmsLogSchema);
