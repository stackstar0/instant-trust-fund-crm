import mongoose, { Schema, model, Document as MongooseDocument } from "mongoose";

export interface IPaymentHistory extends MongooseDocument {
  loanId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  amountPaid: number;
  paymentDate: Date;
  paymentMethod: string;
  transactionRef: string;
  status: "SUCCESS" | "PENDING" | "FAILED";
  createdAt: Date;
  updatedAt: Date;
}

const PaymentHistorySchema = new Schema<IPaymentHistory>(
  {
    loanId: { type: Schema.Types.ObjectId, ref: "Loan", required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    amountPaid: { type: Number, required: true, min: 0 },
    paymentDate: { type: Date, required: true, default: Date.now },
    paymentMethod: { type: String, required: true },
    transactionRef: { type: String, required: true, unique: true },
    status: { 
      type: String, 
      enum: ["SUCCESS", "PENDING", "FAILED"], 
      default: "PENDING" 
    },
  },
  { timestamps: true }
);

export const PaymentHistoryModel = model<IPaymentHistory>("PaymentHistory", PaymentHistorySchema);
