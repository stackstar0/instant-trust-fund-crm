import mongoose, { Schema, Document } from "mongoose";

export interface ISession extends Document {
  userId: string;
  role: "super_admin" | "assistant_admin" | "customer";
  deviceInfo: string;
  ipAddress: string;
  refreshToken: string;
  isActive: boolean;
  expiresAt: Date;
  createdAt: Date;
}

const SessionSchema = new Schema<ISession>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    role: { type: String, enum: ["super_admin", "assistant_admin", "customer"], required: true },
    deviceInfo: { type: String, default: "Unknown Device" },
    ipAddress: { type: String, default: "0.0.0.0" },
    refreshToken: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const SessionModel = mongoose.models.Session || mongoose.model<ISession>("Session", SessionSchema);
