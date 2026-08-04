import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface ICIBILRequest extends MongooseDocument {
  // Requester (can be portal user or walk-in customer)
  userId?: Schema.Types.ObjectId;
  customerId?: Schema.Types.ObjectId;

  // Application details
  fullName: string;
  mobile: string;
  pan: string;               // stored encrypted
  dateOfBirth?: Date;

  // Consent (legally required)
  consentGiven: boolean;
  consentAt?: Date;
  consentIp?: string;
  consentText: string;       // exact consent text shown to user

  // Payment
  amountCharged: number;
  paymentId?: Schema.Types.ObjectId;
  paymentStatus: "pending" | "paid" | "failed" | "waived";

  // Bureau response
  status: "pending" | "processing" | "completed" | "failed" | "cancelled";
  score?: number;            // only set by authorized admin after real bureau response
  reportUrl?: string;        // signed URL — never raw path
  reportStorageKey?: string; // internal cloud storage key

  // Tracking
  requestedBy?: string;      // admin who triggered if manual
  processedBy?: string;      // admin who updated result
  failureReason?: string;

  // Timestamps
  requestedAt: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CIBILRequestSchema = new Schema<ICIBILRequest>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer", index: true },

    fullName: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    pan: { type: String, required: true },  // stored encrypted
    dateOfBirth: { type: Date },

    // Consent
    consentGiven: { type: Boolean, required: true, default: false },
    consentAt: { type: Date },
    consentIp: { type: String },
    consentText: {
      type: String,
      required: true,
      default:
        "I hereby authorize Instant Trust Funds to access my credit information from the Credit Bureau (TransUnion CIBIL) as permitted under the Credit Information Companies (Regulation) Act, 2005.",
    },

    // Payment
    amountCharged: { type: Number, default: 0 },
    paymentId: { type: Schema.Types.ObjectId, ref: "Payment" },
    paymentStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "paid", "failed", "waived"],
    },

    // Bureau response
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "processing", "completed", "failed", "cancelled"],
    },
    score: { type: Number, min: 300, max: 900 }, // CIBIL range
    reportUrl: { type: String },
    reportStorageKey: { type: String, select: false },

    // Tracking
    requestedBy: { type: String },
    processedBy: { type: String },
    failureReason: { type: String },

    requestedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

CIBILRequestSchema.index({ status: 1 });
CIBILRequestSchema.index({ createdAt: -1 });

export const CIBILRequestModel = model<ICIBILRequest>("CIBILRequest", CIBILRequestSchema);
