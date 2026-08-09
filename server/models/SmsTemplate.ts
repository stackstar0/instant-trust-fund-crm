import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface ISmsTemplate extends MongooseDocument {
  templateName: string;
  dltEntityId: string;
  dltTemplateId: string;
  bodyTemplate: string;
  createdAt: Date;
  updatedAt: Date;
}

const SmsTemplateSchema = new Schema<ISmsTemplate>(
  {
    templateName: { type: String, required: true, unique: true },
    dltEntityId: { type: String, required: true },
    dltTemplateId: { type: String, required: true },
    bodyTemplate: { type: String, required: true },
  },
  { timestamps: true }
);

export const SmsTemplateModel = model<ISmsTemplate>("SmsTemplate", SmsTemplateSchema);
