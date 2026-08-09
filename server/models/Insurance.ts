import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface IInsurance extends MongooseDocument {
  policyNumber: string;
  userId: Schema.Types.ObjectId;
  policyType: "Life" | "Health" | "Motor" | "Property";
  premiumAmount: number;
  frequency: "Monthly" | "Quarterly" | "Yearly";
  nextPremiumDate: Date;
  startDate: Date;
  expiryDate: Date;
  status: "ACTIVE" | "RENEWAL_SOON" | "EXPIRED";
  createdAt: Date;
  updatedAt: Date;
}

const InsuranceSchema = new Schema<IInsurance>(
  {
    policyNumber: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    policyType: { 
      type: String, 
      enum: ["Life", "Health", "Motor", "Property"], 
      required: true 
    },
    premiumAmount: { type: Number, required: true, min: 0 },
    frequency: { 
      type: String, 
      enum: ["Monthly", "Quarterly", "Yearly"], 
      required: true 
    },
    nextPremiumDate: { type: Date, required: true },
    startDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    status: { 
      type: String, 
      enum: ["ACTIVE", "RENEWAL_SOON", "EXPIRED"], 
      default: "ACTIVE" 
    },
  },
  { timestamps: true }
);

export const InsuranceModel = model<IInsurance>("Insurance", InsuranceSchema);
