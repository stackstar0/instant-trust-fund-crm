import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface IOTP extends MongooseDocument {
  mobile?: string;
  email?: string;
  code: string;
  createdAt: Date;
}

const OTPSchema = new Schema<IOTP>(
  {
    mobile: { type: String, trim: true, index: true },
    email: { type: String, trim: true, index: true },
    code: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 } // Auto-deletes after 5 minutes (300 seconds)
  }
);

export const OTPModel = model<IOTP>("OTP", OTPSchema);
