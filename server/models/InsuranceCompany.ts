import mongoose, { Schema, Document } from "mongoose";

export interface IInsuranceCompany extends Document {
  name: string;
  code: string;
  type: "Life" | "General" | "Health" | "Motor";
  claimSettlementRatio: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const InsuranceCompanySchema = new Schema<IInsuranceCompany>(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, uppercase: true, unique: true },
    type: {
      type: String,
      enum: ["Life", "General", "Health", "Motor"],
      default: "General",
    },
    claimSettlementRatio: { type: Number, default: 98.2 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const InsuranceCompanyModel =
  mongoose.models.InsuranceCompany ||
  mongoose.model<IInsuranceCompany>("InsuranceCompany", InsuranceCompanySchema);
