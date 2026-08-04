import mongoose, { Schema, Document } from "mongoose";

export interface IBank extends Document {
  name: string;
  code: string;
  category: "Public Sector" | "Private Sector" | "NBFC" | "Cooperative";
  minInterestRate: number;
  maxTenureMonths: number;
  minCibilScore: number;
  logoUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BankSchema = new Schema<IBank>(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, uppercase: true, unique: true },
    category: {
      type: String,
      enum: ["Public Sector", "Private Sector", "NBFC", "Cooperative"],
      default: "Private Sector",
    },
    minInterestRate: { type: Number, default: 8.5 },
    maxTenureMonths: { type: Number, default: 360 },
    minCibilScore: { type: Number, default: 650 },
    logoUrl: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const BankModel = mongoose.models.Bank || mongoose.model<IBank>("Bank", BankSchema);
