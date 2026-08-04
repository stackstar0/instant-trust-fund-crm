import mongoose, { Schema, Document } from "mongoose";

export interface IPropertyRequest extends Document {
  userId?: string;
  applicantName: string;
  applicantMobile: string;
  surveyNumber: string;
  village: string;
  taluk: string;
  district: string;
  state: string;
  pincode?: string;
  propertyType: "Agricultural" | "Residential" | "Commercial" | "Industrial";
  latitude?: number;
  longitude?: number;
  propertyId?: string;
  ownerName: string;
  ownerAddress: string;
  ownerPhone: string;
  status: "Pending" | "In Review" | "Verified" | "Rejected";
  assignedTo?: string; // Assistant Admin ID
  verificationNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PropertyRequestSchema = new Schema<IPropertyRequest>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    applicantName: { type: String, required: true },
    applicantMobile: { type: String, required: true },
    surveyNumber: { type: String, required: true },
    village: { type: String, required: true },
    taluk: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, default: "Karnataka" },
    pincode: { type: String },
    propertyType: {
      type: String,
      enum: ["Agricultural", "Residential", "Commercial", "Industrial"],
      default: "Agricultural",
    },
    latitude: { type: Number },
    longitude: { type: Number },
    propertyId: { type: String },
    ownerName: { type: String, required: true, select: false }, // Masked for public
    ownerAddress: { type: String, required: true, select: false }, // Masked for public
    ownerPhone: { type: String, required: true, select: false }, // Masked for public
    status: {
      type: String,
      enum: ["Pending", "In Review", "Verified", "Rejected"],
      default: "Pending",
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: "AdminAssistant" },
    verificationNotes: { type: String },
  },
  { timestamps: true }
);

export const PropertyRequestModel =
  mongoose.models.PropertyRequest ||
  mongoose.model<IPropertyRequest>("PropertyRequest", PropertyRequestSchema);
