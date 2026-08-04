import { Schema, model, Document as MongooseDocument, Types } from "mongoose";

export interface IApplication extends MongooseDocument {
  userId?: Types.ObjectId | string; // References User if registered
  applicationId: string; // Friendly unique identifier (e.g. IFY10001)
  fullName: string;
  mobile: string;
  email: string;
  aadhaar: string; // Encrypted field
  pan: string; // Encrypted field
  productType: string;
  productKind: "loan" | "insurance";
  status: "Pending" | "Approved" | "Rejected" | "In Review";
  amount: number;
  branch: string;
  bank?: string;
  insuranceType?: string;
  referralCode?: string;
  documents: string[]; // List of file names or paths
  assignedTo?: string; // Admin or Admin Assistant name
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    applicationId: { type: String, required: true, unique: true, index: true },
    fullName: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    aadhaar: { type: String, required: true },
    pan: { type: String, required: true },
    productType: { type: String, required: true, trim: true },
    productKind: { type: String, required: true, enum: ["loan", "insurance"] },
    status: { type: String, default: "Pending", enum: ["Pending", "Approved", "Rejected", "In Review"] },
    amount: { type: Number, required: true },
    branch: { type: String, required: true, trim: true },
    bank: { type: String, trim: true },
    insuranceType: { type: String, trim: true },
    referralCode: { type: String, trim: true },
    documents: { type: [String], default: [] },
    assignedTo: { type: String, default: "Unassigned" },
  },
  { timestamps: true }
);

// Pre-save hook to generate sequential / auto-increment style Application IDs
ApplicationSchema.pre("validate", async function () {
  if (!this.applicationId) {
    // Generate a random but structured ID for this instance if needed,
    // or let the service compute a sequential counter.
    const count = await model("Application").countDocuments();
    this.applicationId = `IFY${(10000 + count + 1).toString()}`;
  }
});

export const ApplicationModel = model<IApplication>("Application", ApplicationSchema);
