import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { WebsiteSettingsModel } from "../models/WebsiteSettings";
import { PartnerModel } from "../models/Partner";
import { AppError } from "../middlewares/errorMiddleware";

export const getSettings = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let settings = await WebsiteSettingsModel.findOne({ key: "global" });
    if (!settings) {
      settings = await WebsiteSettingsModel.create({ key: "global" });
    }
    res.status(200).json({
      status: "success",
      settings
    });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    let settings = await WebsiteSettingsModel.findOne({ key: "global" });
    if (!settings) {
      settings = new WebsiteSettingsModel({ key: "global" });
    }

    const { maintenanceMode, allowRegistrations, smsGatewayEnabled, smsConfig, smtpConfig } = req.body;

    if (maintenanceMode !== undefined) settings.maintenanceMode = maintenanceMode;
    if (allowRegistrations !== undefined) settings.allowRegistrations = allowRegistrations;
    if (smsGatewayEnabled !== undefined) settings.smsGatewayEnabled = smsGatewayEnabled;
    if (smsConfig) settings.smsConfig = { ...settings.smsConfig, ...smsConfig };
    if (smtpConfig) settings.smtpConfig = { ...settings.smtpConfig, ...smtpConfig };
    settings.updatedBy = user.email;

    await settings.save();

    res.status(200).json({
      status: "success",
      settings
    });
  } catch (error) {
    next(error);
  }
};

export const getPartners = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const partners = await PartnerModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: "success",
      partners
    });
  } catch (error) {
    next(error);
  }
};

export const createPartner = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, category, logoUrl, rating } = req.body;

    if (!name || !category) {
      return next(new AppError("Name and category are required fields.", 400));
    }

    const partner = await PartnerModel.create({
      name,
      category,
      logoUrl,
      rating
    });

    res.status(201).json({
      status: "success",
      partner
    });
  } catch (error) {
    next(error);
  }
};

export const deletePartner = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const partner = await PartnerModel.findByIdAndDelete(req.params.id);
    if (!partner) return next(new AppError("Partner not found.", 404));

    res.status(200).json({
      status: "success",
      message: "Partner removed successfully."
    });
  } catch (error) {
    next(error);
  }
};
