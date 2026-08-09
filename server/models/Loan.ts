import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface ILoan extends MongooseDocument {
  loanId: string;
  userId: Schema.Types.ObjectId;
  loanType: "Home Loan" | "Business Loan" | "Vehicle Loan" | "Personal Loan";
  principalAmount: number;
  interestRate: number;
  tenureMonths: number;
  startDate: Date;
  endDate: Date;
  emiAmount: number;
  emiDueDate: number; // Day of month
  outstandingAmount: number;
  lastPaymentDate?: Date;
  nextEmiDate: Date;
  status: "ACTIVE" | "DUE_SOON" | "OVERDUE" | "CLOSED" | "DELINQUENT";
  createdAt: Date;
  updatedAt: Date;
}

const LoanSchema = new Schema<ILoan>(
  {
    loanId: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    loanType: { 
      type: String, 
      enum: ["Home Loan", "Business Loan", "Vehicle Loan", "Personal Loan"], 
      required: true 
    },
    principalAmount: { type: Number, required: true, min: 0 },
    interestRate: { type: Number, required: true, min: 0 },
    tenureMonths: { type: Number, required: true, min: 1 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    emiAmount: { type: Number, required: true, min: 0 },
    emiDueDate: { type: Number, required: true, min: 1, max: 31 },
    outstandingAmount: { type: Number, required: true, min: 0 },
    lastPaymentDate: { type: Date },
    nextEmiDate: { type: Date, required: true },
    status: { 
      type: String, 
      enum: ["ACTIVE", "DUE_SOON", "OVERDUE", "CLOSED", "DELINQUENT"], 
      default: "ACTIVE" 
    },
  },
  { timestamps: true }
);

export const LoanModel = model<ILoan>("Loan", LoanSchema);
