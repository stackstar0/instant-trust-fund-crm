import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface IAdminAssistant extends MongooseDocument {
  fullName: string;
  email: string;
  mobile?: string;
  passwordHash: string;
  role: "assistant_admin";
  permissions: string[];
  status: "active" | "suspended";
  createdAt: Date;
  updatedAt: Date;
}

const AdminAssistantSchema = new Schema<IAdminAssistant>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true, 
      lowercase: true,
      index: true
    },
    mobile: { 
      type: String, 
      unique: true, 
      sparse: true, 
      trim: true 
    },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "assistant_admin", enum: ["assistant_admin"] },
    permissions: { 
      type: [String], 
      default: ["read_customers", "read_applications", "update_applications", "read_tasks", "update_tasks"] 
    },
    status: { type: String, default: "active", enum: ["active", "suspended"] },
  },
  { timestamps: true }
);

export const AdminAssistantModel = model<IAdminAssistant>("AdminAssistant", AdminAssistantSchema);
