import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  name: string;
  code: "PUBLIC" | "USER" | "ASSISTANT_ADMIN" | "SUPER_ADMIN";
  description: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true },
    code: {
      type: String,
      enum: ["PUBLIC", "USER", "ASSISTANT_ADMIN", "SUPER_ADMIN"],
      required: true,
      unique: true,
    },
    description: { type: String },
    permissions: [{ type: String }],
  },
  { timestamps: true }
);

export const RoleModel = mongoose.models.Role || mongoose.model<IRole>("Role", RoleSchema);
