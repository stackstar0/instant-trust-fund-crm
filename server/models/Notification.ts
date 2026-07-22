import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface INotification extends MongooseDocument {
  userId?: Schema.Types.ObjectId;
  type: "EMI Due" | "Insurance Renewal" | "Loan Approval" | "Pending Documents";
  customer: string; // Customer name
  dueDate?: Date;
  amount?: number;
  read: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    type: { 
      type: String, 
      required: true, 
      enum: ["EMI Due", "Insurance Renewal", "Loan Approval", "Pending Documents"] 
    },
    customer: { type: String, required: true },
    dueDate: { type: Date },
    amount: { type: Number },
    read: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const NotificationModel = model<INotification>("Notification", NotificationSchema);
