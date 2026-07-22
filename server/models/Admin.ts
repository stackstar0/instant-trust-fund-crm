import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface IAdmin extends MongooseDocument {
  fullName: string;
  email: string;
  mobile?: string;
  passwordHash: string;
  role: "super_admin";
  status: "active" | "suspended";
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
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
    role: { type: String, default: "super_admin", enum: ["super_admin"] },
    status: { type: String, default: "active", enum: ["active", "suspended"] },
  },
  { timestamps: true }
);

export const AdminModel = model<IAdmin>("Admin", AdminSchema);
