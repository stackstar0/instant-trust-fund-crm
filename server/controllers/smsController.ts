import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { SmsTemplateModel } from "../models/SmsTemplate";
import { SmsLogModel } from "../models/SmsLog";
import { dispatchSmsJob } from "../queues/smsQueue";
import { AppError } from "../middlewares/errorMiddleware";

export const getSmsOverview = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [sentCount, deliveredCount, failedCount, scrubbedCount, templates, logs] = await Promise.all([
      SmsLogModel.countDocuments({ createdAt: { $gte: today }, status: { $in: ["SENT", "DELIVERED"] } }),
      SmsLogModel.countDocuments({ createdAt: { $gte: today }, status: "DELIVERED" }),
      SmsLogModel.countDocuments({ createdAt: { $gte: today }, status: "FAILED" }),
      SmsLogModel.countDocuments({ createdAt: { $gte: today }, status: "SCRUBBED_LOCAL" }),
      SmsTemplateModel.find().sort({ createdAt: -1 }).lean(),
      SmsLogModel.find().sort({ createdAt: -1 }).limit(50).lean(),
    ]);

    const approvedCount = templates.filter((t) => t.dltStatus === "APPROVED").length;
    const uniqueHeaders = Array.from(new Set(templates.map((t) => t.header)));

    const peTmChainId = process.env.PE_TM_CHAIN_ID || "PE-TM-1100223344";
    const dltStatus = approvedCount > 0 ? "VERIFIED" : "PENDING";

    res.status(200).json({
      status: "success",
      stats: {
        sent: sentCount,
        delivered: deliveredCount,
        failed: failedCount,
        scrubbed: scrubbedCount,
        templates: templates.length,
        approvedTemplates: approvedCount,
        headersCount: uniqueHeaders.length,
        dltStatus,
        peTmChainStatus: peTmChainId ? "ACTIVE" : "UNCONFIGURED",
        peTmChainId,
      },
      templates,
      logs,
    });
  } catch (error) {
    next(error);
  }
};

export const getSmsTemplates = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const templates = await SmsTemplateModel.find().sort({ createdAt: -1 }).lean();
    res.status(200).json({
      status: "success",
      templates,
    });
  } catch (error) {
    next(error);
  }
};

export const createSmsTemplate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { templateName, dltTemplateId, header, category, bodyTemplate, variableTags, whitelistedUrls } = req.body;

    if (!templateName || !dltTemplateId || !header || !bodyTemplate) {
      return next(new AppError("templateName, dltTemplateId, header, and bodyTemplate are required.", 400));
    }

    const existing = await SmsTemplateModel.findOne({ dltTemplateId });
    if (existing) {
      return next(new AppError("A DLT template with this DLT Template ID already exists.", 400));
    }

    const template = await SmsTemplateModel.create({
      templateName,
      dltTemplateId,
      header,
      category: category || "SERVICE_IMPLICIT",
      bodyTemplate,
      variableTags: variableTags || [],
      whitelistedUrls: whitelistedUrls || [],
      dltStatus: "APPROVED", // Auto-approve for internal admin entries
      approvalDate: new Date(),
    });

    res.status(201).json({
      status: "success",
      template,
    });
  } catch (error) {
    next(error);
  }
};

export const sendTestSms = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { phone, dltTemplateId, variableMap } = req.body;

    if (!phone || !dltTemplateId) {
      return next(new AppError("phone and dltTemplateId are required.", 400));
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return next(new AppError("Invalid 10-digit Indian mobile number.", 400));
    }

    let template = await SmsTemplateModel.findOne({ dltTemplateId });
    if (!template) {
      // Fallback create dummy template if missing
      template = await SmsTemplateModel.create({
        templateName: "TEST_TEMPLATE",
        dltTemplateId,
        header: "TRSTFD-S",
        category: "SERVICE_IMPLICIT",
        bodyTemplate: "Dear {{customer_name}}, test OTP message for instant trust funds.",
        variableTags: [{ varName: "customer_name", tagType: "#alphanumeric#" }],
        dltStatus: "APPROVED",
        approvalDate: new Date(),
      });
    }

    const vars = variableMap || { customer_name: "Test User" };
    const log = await dispatchSmsJob(
      {
        phone: cleanPhone,
        userId: req.user?.id,
      },
      template,
      vars
    );

    res.status(200).json({
      status: "success",
      message: "Test SMS job dispatched successfully.",
      log,
    });
  } catch (error) {
    next(error);
  }
};
