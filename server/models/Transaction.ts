import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  paymentId?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  userId?: string;
  amount: number;
  currency: string;
  status: "CREATED" | "AUTHORIZED" | "CAPTURED" | "FAILED" | "REFUNDED";
  purpose: string;
  rawWebhookPayload?: any;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    paymentId: { type: Schema.Types.ObjectId, ref: "Payment" },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: {
      type: String,
      enum: ["CREATED", "AUTHORIZED", "CAPTURED", "FAILED", "REFUNDED"],
      default: "CREATED",
    },
    purpose: { type: String, required: true },
    rawWebhookPayload: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const TransactionModel =
  mongoose.models.Transaction || mongoose.model<ITransaction>("Transaction", TransactionSchema);
