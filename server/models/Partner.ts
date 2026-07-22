import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface IPartner extends MongooseDocument {
  name: string;
  category: "loan" | "insurance" | "tech";
  logoUrl?: string;
  rating?: number;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

const PartnerSchema = new Schema<IPartner>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true, enum: ["loan", "insurance", "tech"] },
    logoUrl: { type: String },
    rating: { type: Number, default: 5 },
    status: { type: String, default: "active", enum: ["active", "inactive"] }
  },
  { timestamps: true }
);

export const PartnerModel = model<IPartner>("Partner", PartnerSchema);
