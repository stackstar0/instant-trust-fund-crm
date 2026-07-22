import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface IDocument extends MongooseDocument {
  applicationId?: string;
  userId?: Schema.Types.ObjectId;
  fileName: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  status: "Pending" | "Verified" | "Rejected";
  uploadedAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
  {
    applicationId: { type: String, trim: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    fileName: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    status: { type: String, default: "Pending", enum: ["Pending", "Verified", "Rejected"] },
  },
  { timestamps: { createdAt: "uploadedAt", updatedAt: true } }
);

export const DocumentModel = model<IDocument>("Document", DocumentSchema);
