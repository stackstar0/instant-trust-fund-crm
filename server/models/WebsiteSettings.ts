import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface IWebsiteSettings extends MongooseDocument {
  key: string; // e.g. "global"
  maintenanceMode: boolean;
  allowRegistrations: boolean;
  smsGatewayEnabled: boolean;
  smsConfig: {
    provider: string;
    apiKey: string;
    senderId: string;
  };
  smtpConfig: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
  };
  updatedBy: string;
  updatedAt: Date;
}

const WebsiteSettingsSchema = new Schema<IWebsiteSettings>(
  {
    key: { type: String, default: "global", unique: true },
    maintenanceMode: { type: Boolean, default: false },
    allowRegistrations: { type: Boolean, default: true },
    smsGatewayEnabled: { type: Boolean, default: false },
    smsConfig: {
      provider: { type: String, default: "Twilio" },
      apiKey: { type: String, default: "" },
      senderId: { type: String, default: "" },
    },
    smtpConfig: {
      host: { type: String, default: "" },
      port: { type: Number, default: 587 },
      secure: { type: Boolean, default: false },
      user: { type: String, default: "" },
      pass: { type: String, default: "" },
    },
    updatedBy: { type: String, default: "System" },
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

export const WebsiteSettingsModel = model<IWebsiteSettings>("WebsiteSettings", WebsiteSettingsSchema);
