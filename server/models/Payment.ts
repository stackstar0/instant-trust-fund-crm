import { Schema, model, Document as MongooseDocument } from "mongoose";

/**
 * Payment — Created when Razorpay order is initiated.
 * IMPORTANT: Payment is only marked "paid" AFTER server-side signature verification.
 * The frontend payment success signal is NEVER trusted.
 */
export interface IPayment extends MongooseDocument {
  // Razorpay identifiers
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;

  // Payer
  userId?: Schema.Types.ObjectId;
  customerId?: Schema.Types.ObjectId;
  payerName: string;
  payerEmail?: string;
  payerMobile?: string;

  // Amount
  amount: number;             // in paise (₹1 = 100 paise)
  amountInRupees: number;
  currency: string;

  // Purpose
  purpose: "cibil_check" | "loan_processing_fee" | "insurance_premium" | "property_verification" | "other";
  referenceId?: string;       // linked application ID or CIBIL request ID
  description?: string;

  // Status
  status: "created" | "attempted" | "paid" | "failed" | "refunded" | "expired";

  // Verification
  signatureVerified: boolean;
  verifiedAt?: Date;
  verifiedByWebhook: boolean;

  // Webhook
  webhookReceivedAt?: Date;
  webhookEvent?: string;

  // Refund
  refundId?: string;
  refundAmount?: number;
  refundedAt?: Date;

  // Receipt
  receiptNumber?: string;

  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    // Razorpay
    razorpayOrderId: { type: String, required: true, unique: true, index: true },
    razorpayPaymentId: { type: String, unique: true, sparse: true, index: true },
    razorpaySignature: { type: String, select: false }, // don't expose in normal queries

    // Payer
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer", index: true },
    payerName: { type: String, required: true },
    payerEmail: { type: String },
    payerMobile: { type: String },

    // Amount
    amount: { type: Number, required: true, min: 1 },        // paise
    amountInRupees: { type: Number, required: true, min: 0.01 },
    currency: { type: String, default: "INR", uppercase: true },

    // Purpose
    purpose: {
      type: String,
      required: true,
      enum: ["cibil_check", "loan_processing_fee", "insurance_premium", "property_verification", "other"],
    },
    referenceId: { type: String, index: true },
    description: { type: String },

    // Status
    status: {
      type: String,
      default: "created",
      enum: ["created", "attempted", "paid", "failed", "refunded", "expired"],
      index: true,
    },

    // Verification
    signatureVerified: { type: Boolean, default: false },
    verifiedAt: { type: Date },
    verifiedByWebhook: { type: Boolean, default: false },

    // Webhook
    webhookReceivedAt: { type: Date },
    webhookEvent: { type: String },

    // Refund
    refundId: { type: String },
    refundAmount: { type: Number },
    refundedAt: { type: Date },

    // Receipt
    receiptNumber: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

PaymentSchema.index({ status: 1, createdAt: -1 });
PaymentSchema.index({ purpose: 1 });

export const PaymentModel = model<IPayment>("Payment", PaymentSchema);
