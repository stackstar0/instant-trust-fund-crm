import mongoose, { Schema, model, Document as MongooseDocument } from "mongoose";

export interface ILoanAccount extends MongooseDocument {
  loanId: string;
  customerId: mongoose.Types.ObjectId;
  loanType: 'Home Loan' | 'Personal Loan' | 'Property Loan' | 'Business Loan' | 'Equipment Loan';
  principalAmount: number;
  interestRate: number;
  tenureMonths: number;
  startDate: Date;
  endDate: Date;
  emiAmount: number;
  emiDueDate: number; // Day of month
  outstandingAmount: number;
  nextEmiDate: Date;
  lastPaymentDate?: Date;
  status: 'ACTIVE' | 'DUE_SOON' | 'OVERDUE' | 'CLOSED' | 'DELINQUENT';
  createdAt: Date;
  updatedAt: Date;
}

const LoanAccountSchema = new Schema<ILoanAccount>(
  {
    loanId: { type: String, required: true, unique: true, index: true },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true, index: true },
    loanType: { 
      type: String, 
      enum: ['Home Loan', 'Personal Loan', 'Property Loan', 'Business Loan', 'Equipment Loan'], 
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
    nextEmiDate: { type: Date, required: true },
    lastPaymentDate: { type: Date },
    status: { 
      type: String, 
      enum: ['ACTIVE', 'DUE_SOON', 'OVERDUE', 'CLOSED', 'DELINQUENT'], 
      default: 'ACTIVE' 
    },
  },
  { timestamps: true }
);

export const LoanAccountModel = model<ILoanAccount>("LoanAccount", LoanAccountSchema);
