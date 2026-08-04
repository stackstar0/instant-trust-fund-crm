import mongoose, { Schema, Document } from "mongoose";

export interface IActivityLog extends Document {
  userId?: string;
  role?: string;
  activityType: string;
  description: string;
  ipAddress?: string;
  metadata?: any;
  createdAt: Date;
}

const ActivityLogSchema = new Schema<IActivityLog>(
  {
    userId: { type: Schema.Types.ObjectId },
    role: { type: String },
    activityType: { type: String, required: true },
    description: { type: String, required: true },
    ipAddress: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const ActivityLogModel =
  mongoose.models.ActivityLog || mongoose.model<IActivityLog>("ActivityLog", ActivityLogSchema);
