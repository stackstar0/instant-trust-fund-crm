import mongoose, { Schema, model, Document as MongooseDocument } from "mongoose";

export interface IVariableTag {
  varName: string;
  tagType: "#number#" | "#url#" | "#alphanumeric#" | "#email#";
}

export interface ISmsTemplate extends MongooseDocument {
  templateName: string;
  dltTemplateId: string;
  header: string;
  category: "TRANSACTIONAL" | "SERVICE_IMPLICIT" | "PROMOTIONAL";
  bodyTemplate: string;
  variableTags: IVariableTag[];
  whitelistedUrls?: string[];
  dltStatus: "APPROVED" | "PENDING" | "REJECTED";
  approvalDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const VariableTagSchema = new Schema<IVariableTag>(
  {
    varName: { type: String, required: true },
    tagType: { 
      type: String, 
      enum: ["#number#", "#url#", "#alphanumeric#", "#email#"], 
      required: true 
    },
  },
  { _id: false }
);

const SmsTemplateSchema = new Schema<ISmsTemplate>(
  {
    templateName: { type: String, required: true, trim: true },
    dltTemplateId: { type: String, required: true, unique: true, trim: true },
    header: { type: String, required: true, trim: true },
    category: { 
      type: String, 
      enum: ["TRANSACTIONAL", "SERVICE_IMPLICIT", "PROMOTIONAL"], 
      default: "SERVICE_IMPLICIT" 
    },
    bodyTemplate: { type: String, required: true },
    variableTags: [VariableTagSchema],
    whitelistedUrls: [{ type: String, trim: true }],
    dltStatus: { 
      type: String, 
      enum: ["APPROVED", "PENDING", "REJECTED"], 
      default: "PENDING" 
    },
    approvalDate: { type: Date },
  },
  { timestamps: true }
);

export const SmsTemplateModel = model<ISmsTemplate>("SmsTemplate", SmsTemplateSchema);
