import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface IRefreshToken extends MongooseDocument {
  token: string;
  userId: string;
  role: "super_admin" | "assistant_admin" | "customer";
  expiresAt: Date;
  createdAt: Date;
}

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    token: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    role: { type: String, required: true, enum: ["super_admin", "assistant_admin", "customer"] },
    expiresAt: { type: Date, required: true, index: true }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Expire document automatically when expiresAt is reached
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RefreshTokenModel = model<IRefreshToken>("RefreshToken", RefreshTokenSchema);
