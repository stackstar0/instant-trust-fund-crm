import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { ApplicationModel } from "../models/Application";
import { DocumentModel } from "../models/Document";
import { AuditLogModel } from "../models/AuditLog";
import { AppError } from "../middlewares/errorMiddleware";
import { encryptField, decryptField } from "../utils/crypto";

const getStringParam = (value: string | string[] | undefined): string | undefined => {
  if (Array.isArray(value)) return value[0];
  return value;
};

const buildApplicationLookup = (id: string) => ({
  $or: [
    { applicationId: id },
    ...(id.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: id }] : [])
  ]
});

export const apply = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { fullName, mobile, email, aadhaar, pan, productType, productKind, amount, branch, bank, insuranceType, referralCode } = req.body;

    if (!fullName || !mobile || !email || !aadhaar || !pan || !productType || !productKind || !amount || !branch) {
      return next(new AppError("Missing required application fields.", 400));
    }

    // Encrypt Aadhaar & PAN using AES-256-GCM
    const encryptedAadhaar = encryptField(aadhaar);
    const encryptedPan = encryptField(pan);

    // If request has logged-in user, assign userId
    const userId = req.user ? req.user.id : undefined;

    // Auto-calculate assigned employee
    let assignedTo = "R H Adhoni";
    if (referralCode) {
      const ref = referralCode.trim().toUpperCase();
      if (ref.includes("AYESHA") || ref.includes("EMP002") || ref === "BROKER101") {
        assignedTo = "Bibi Ayesha";
      }
    }

    const application = await ApplicationModel.create({
      userId,
      fullName,
      mobile,
      email,
      aadhaar: encryptedAadhaar,
      pan: encryptedPan,
      productType,
      productKind,
      amount,
      branch,
      bank,
      insuranceType,
      referralCode,
      assignedTo
    } as any);

    await AuditLogModel.create({
      action: "CREATE_APPLICATION",
      actorId: req.user ? req.user.id : "ANONYMOUS",
      actorEmail: req.user ? req.user.email : email,
      actorRole: req.user ? req.user.role : "customer",
      targetId: application.applicationId,
      details: { productType, productKind, amount },
      ipAddress: req.ip,
      device: req.headers["user-agent"]
    });

    res.status(201).json({
      status: "success",
      application
    });
  } catch (error) {
    next(error);
  }
};

export const getApplications = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { status, productKind, search, page = 1, limit = 50 } = req.query;
    const user = req.user!;
    const filterQuery: any = {};
    const statusValue = typeof status === "string" ? status : undefined;
    const productKindValue = typeof productKind === "string" ? productKind : undefined;
    const searchValue = typeof search === "string" ? search : undefined;

    // 1) Enforce Ownership: Customer can only view their own applications
    if (user.role === "customer") {
      filterQuery.userId = user.id;
    } else {
      // Admins/Assistants can filter by assignment if needed or view all
      if (productKindValue) filterQuery.productKind = productKindValue;
      if (statusValue) filterQuery.status = statusValue;
      if (searchValue) {
        const query = searchValue.trim();
        filterQuery.$or = [
          { fullName: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
          { mobile: { $regex: query, $options: "i" } },
          { applicationId: { $regex: query, $options: "i" } }
        ];
      }
    }

    const skipCount = (Number(page) - 1) * Number(limit);
    const total = await ApplicationModel.countDocuments(filterQuery);
    
    // Sort recent first
    const applications = await ApplicationModel.find(filterQuery)
      .sort({ createdAt: -1 })
      .skip(skipCount)
      .limit(Number(limit));

    // Privacy Shield: Redact Aadhaar/PAN fields in list view
    const redactedApps = applications.map(app => {
      const appObj = app.toObject();
      appObj.aadhaar = "[REDACTED]";
      appObj.pan = "[REDACTED]";
      return appObj;
    });

    res.status(200).json({
      status: "success",
      results: redactedApps.length,
      total,
      applications: redactedApps
    });
  } catch (error) {
    next(error);
  }
};

export const getApplicationDetails = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const id = getStringParam(req.params.id); // applicationId or _id
    const user = req.user!;

    if (!id) {
      return next(new AppError("Application identifier is required.", 400));
    }

    const application = await ApplicationModel.findOne(buildApplicationLookup(id));

    if (!application) {
      return next(new AppError("Application not found.", 404));
    }

    // Enforce Ownership check
    if (user.role === "customer" && application.userId?.toString() !== user.id) {
      return next(new AppError("You are not authorized to view this application.", 403));
    }

    const appObj = application.toObject();

    // Enforce Privacy: Only Super Admin (role === "super_admin") can decrypt Aadhaar and PAN
    if (user.role === "super_admin") {
      appObj.aadhaar = decryptField(application.aadhaar);
      appObj.pan = decryptField(application.pan);
    } else {
      appObj.aadhaar = "[SHIELDED]";
      appObj.pan = "[SHIELDED]";
    }

    res.status(200).json({
      status: "success",
      application: appObj
    });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const id = getStringParam(req.params.id);
    const { status } = req.body;
    const user = req.user!;

    if (!id) {
      return next(new AppError("Application identifier is required.", 400));
    }

    if (!["Pending", "Approved", "Rejected", "In Review"].includes(status)) {
      return next(new AppError("Invalid application status.", 400));
    }

    const application = await ApplicationModel.findOne(buildApplicationLookup(id));

    if (!application) {
      return next(new AppError("Application not found.", 404));
    }

    const oldStatus = application.status;
    application.status = status;
    await application.save();

    await AuditLogModel.create({
      action: "UPDATE_STATUS",
      actorId: user.id,
      actorEmail: user.email,
      actorRole: user.role,
      targetId: application.applicationId,
      details: { oldStatus, newStatus: status },
      ipAddress: req.ip,
      device: req.headers["user-agent"]
    });

    res.status(200).json({
      status: "success",
      application
    });
  } catch (error) {
    next(error);
  }
};

export const deleteApplication = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const id = getStringParam(req.params.id);
    const user = req.user!;

    if (!id) {
      return next(new AppError("Application identifier is required.", 400));
    }

    const application = await ApplicationModel.findOne(buildApplicationLookup(id));

    if (!application) {
      return next(new AppError("Application not found.", 404));
    }

    await ApplicationModel.deleteOne({ _id: application._id });

    // Clean up corresponding documents
    await DocumentModel.deleteMany({ applicationId: application.applicationId });

    await AuditLogModel.create({
      action: "DELETE_APPLICATION",
      actorId: user.id,
      actorEmail: user.email,
      actorRole: user.role,
      targetId: application.applicationId,
      details: { fullName: application.fullName, productType: application.productType },
      ipAddress: req.ip,
      device: req.headers["user-agent"]
    });

    res.status(200).json({
      status: "success",
      message: "Application deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};

export const uploadDoc = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const applicationId = getStringParam(req.params.applicationId);
    const file = req.file;

    if (!file) {
      return next(new AppError("Please upload a file.", 400));
    }

    if (!applicationId) {
      return next(new AppError("Application identifier is required.", 400));
    }

    const application = await ApplicationModel.findOne({ applicationId });
    if (!application) {
      return next(new AppError("Target application does not exist.", 404));
    }

    const newDoc = await DocumentModel.create({
      applicationId,
      userId: req.user ? req.user.id : undefined,
      fileName: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      fileSize: file.size
    } as any);

    // Append to application's documents list
    application.documents.push(file.filename);
    await application.save();

    await AuditLogModel.create({
      action: "UPLOAD_DOCUMENT",
      actorId: req.user ? req.user.id : "ANONYMOUS",
      actorEmail: req.user ? req.user.email : "anonymous@example.com",
      actorRole: req.user ? req.user.role : "customer",
      targetId: applicationId,
      details: { docId: newDoc._id, originalName: file.originalname },
      ipAddress: req.ip,
      device: req.headers["user-agent"]
    });

    res.status(201).json({
      status: "success",
      document: newDoc,
      application
    });
  } catch (error) {
    next(error);
  }
};
