import mongoose, { Schema, Document } from "mongoose";

export interface IPermission extends Document {
  key: string;
  name: string;
  module: "CUSTOMERS" | "APPLICATIONS" | "TASKS" | "SUPPORT" | "DOCUMENTS" | "COMMUNICATION";
  description: string;
}

const PermissionSchema = new Schema<IPermission>(
  {
    key: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    module: {
      type: String,
      enum: ["CUSTOMERS", "APPLICATIONS", "TASKS", "SUPPORT", "DOCUMENTS", "COMMUNICATION"],
      required: true,
    },
    description: { type: String },
  },
  { timestamps: true }
);

export const PermissionModel =
  mongoose.models.Permission || mongoose.model<IPermission>("Permission", PermissionSchema);
