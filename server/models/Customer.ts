import { Schema, model, Document as MongooseDocument } from "mongoose";

/**
 * Customer — Dedicated collection for financial service customers.
 * Separate from User (portal account holders).
 * Contains PII encrypted at rest.
 */
export interface ICustomer extends MongooseDocument {
  // Identity
  fullName: string;
  normalizedName: string; // lowercase, trimmed for dedup
  fatherName?: string;
  dateOfBirth?: Date;
  gender?: "male" | "female" | "other";

  // Contact (PII — partially masked in list views)
  mobile: string;               // normalized to 10 digits
  alternateMobile?: string;
  email?: string;

  // Documents (encrypted at rest)
  aadhaar?: string;             // encrypted
  pan?: string;                 // encrypted

  // Address
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  district?: string;
  state?: string;
  pincode?: string;

  // Business context
  occupation?: string;
  monthlyIncome?: number;
  employerName?: string;

  // CRM metadata
  source: "manual" | "imported" | "web_application" | "referral" | "partner";
  importBatchId?: Schema.Types.ObjectId;
  isImported: boolean;
  assignedAgent?: string;       // Agent/Admin name
  assignedAgentId?: Schema.Types.ObjectId;

  // KYC
  kycStatus: "not_started" | "pending" | "verified" | "rejected";
  kycVerifiedAt?: Date;
  kycVerifiedBy?: string;

  // Notes
  notes?: string;
  tags?: string[];

  // Soft delete
  isDeleted: boolean;
  deletedAt?: Date;
  deletedBy?: string;

  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema = new Schema<ICustomer>(
  {
    // Identity
    fullName: { type: String, required: true, trim: true, maxlength: 150 },
    normalizedName: { type: String, required: true, lowercase: true, trim: true, index: true },
    fatherName: { type: String, trim: true },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["male", "female", "other"] },

    // Contact
    mobile: {
      type: String,
      required: true,
      trim: true,
      index: true,
      match: [/^[6-9]\d{9}$/, "Invalid Indian mobile number"],
    },
    alternateMobile: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },

    // Encrypted documents
    aadhaar: { type: String, select: false },  // encrypted, only select explicitly
    pan: { type: String, select: false },      // encrypted, only select explicitly

    // Address
    addressLine1: { type: String, trim: true },
    addressLine2: { type: String, trim: true },
    city: { type: String, trim: true },
    district: { type: String, trim: true },
    state: { type: String, trim: true },
    pincode: { type: String, trim: true, match: [/^\d{6}$/, "Invalid pincode"] },

    // Business
    occupation: { type: String, trim: true },
    monthlyIncome: { type: Number, min: 0 },
    employerName: { type: String, trim: true },

    // CRM
    source: {
      type: String,
      required: true,
      enum: ["manual", "imported", "web_application", "referral", "partner"],
      default: "manual",
    },
    importBatchId: { type: Schema.Types.ObjectId, ref: "ImportBatch", index: true },
    isImported: { type: Boolean, default: false },
    assignedAgent: { type: String },
    assignedAgentId: { type: Schema.Types.ObjectId, ref: "AdminAssistant" },

    // KYC
    kycStatus: {
      type: String,
      default: "not_started",
      enum: ["not_started", "pending", "verified", "rejected"],
    },
    kycVerifiedAt: { type: Date },
    kycVerifiedBy: { type: String },

    // Notes
    notes: { type: String, maxlength: 2000 },
    tags: { type: [String], default: [] },

    // Soft delete
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date },
    deletedBy: { type: String },
  },
  { timestamps: true }
);

// Compound index for deduplication checks
CustomerSchema.index({ mobile: 1, isDeleted: 1 });
CustomerSchema.index({ normalizedName: 1, mobile: 1 }, { unique: true, sparse: true });

// Text search index
CustomerSchema.index(
  { fullName: "text", mobile: "text", email: "text" },
  { name: "customer_text_search" }
);

export const CustomerModel = model<ICustomer>("Customer", CustomerSchema);
