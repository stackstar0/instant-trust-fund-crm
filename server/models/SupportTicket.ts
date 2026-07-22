import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface IMessage {
  sender: "customer" | "admin" | "assistant_admin";
  name: string;
  content: string;
  sentAt: Date;
}

export interface ISupportTicket extends MongooseDocument {
  userId?: Schema.Types.ObjectId;
  userName: string;
  subject: string;
  status: "Open" | "In Progress" | "Closed";
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  sender: { type: String, required: true, enum: ["customer", "admin", "assistant_admin"] },
  name: { type: String, required: true },
  content: { type: String, required: true },
  sentAt: { type: Date, default: Date.now }
});

const SupportTicketSchema = new Schema<ISupportTicket>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    userName: { type: String, required: true },
    subject: { type: String, required: true, trim: true },
    status: { type: String, default: "Open", enum: ["Open", "In Progress", "Closed"] },
    messages: { type: [MessageSchema], default: [] }
  },
  { timestamps: true }
);

export const SupportTicketModel = model<ISupportTicket>("SupportTicket", SupportTicketSchema);
