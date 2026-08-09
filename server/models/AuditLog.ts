import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface IAuditLog extends MongooseDocument {
  action: string;
  actorId: string;
  actorEmail: string;
  actorRole: "super_admin" | "assistant_admin" | "customer" | "Admin" | "AssistantAdmin" | "User";
  targetId?: string;
  details?: Schema.Types.Mixed;
  ipAddress?: string;
  device?: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    action: { type: String, required: true, index: true },
    actorId: { type: String, required: true, index: true },
    actorEmail: { type: String, required: true },
    actorRole: { type: String, required: true, enum: ["super_admin", "assistant_admin", "customer", "Admin", "AssistantAdmin", "User"] },
    targetId: { type: String, index: true },
    details: { type: Schema.Types.Mixed },
    ipAddress: { type: String },
    device: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const AuditLogModel = model<IAuditLog>("AuditLog", AuditLogSchema);
