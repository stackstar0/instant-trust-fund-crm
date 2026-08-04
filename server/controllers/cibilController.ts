import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { CIBILRequestModel } from "../models/CIBILRequest";
import { AuditLogModel } from "../models/AuditLog";
import { AppError } from "../middlewares/errorMiddleware";

export const requestCIBILCheck = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { fullName, mobile, pan, consentGiven } = req.body;

    if (!fullName || !mobile || !pan) {
      return next(new AppError("Full name, mobile number, and PAN card number are required.", 400));
    }

    if (!consentGiven) {
      return next(new AppError("Customer consent is strictly required for credit report access.", 400));
    }

    const cleanPan = pan.trim().toUpperCase();
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(cleanPan)) {
      return next(new AppError("Invalid PAN format. Example: ABCDE1234F", 400));
    }

    const cibilReq = await CIBILRequestModel.create({
      userId: req.user?.id,
      fullName,
      mobile,
      pan: cleanPan,
      consentGiven: true,
      consentTimestamp: new Date(),
      consentIp: req.ip,
      status: "pending_verification", // NEVER generate fake scores! Show pending verification
      creditScore: undefined,
    });

    await AuditLogModel.create({
      action: "CIBIL_REQUEST_SUBMITTED",
      actorId: req.user?.id || "anonymous",
      actorEmail: req.user?.email || "anonymous",
      actorRole: req.user?.role || "customer",
      targetId: cibilReq._id.toString(),
      details: `Submitted CIBIL report request with explicit consent for PAN: ${cleanPan.slice(0, 5)}****`,
    });

    res.status(201).json({
      status: "success",
      message: "CIBIL score check request submitted successfully. Status is Pending Verification.",
      cibilRequest: cibilReq,
    });
  } catch (error) {
    next(error);
  }
};

export const getCIBILRequests = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const query = req.user?.role === "customer" ? { userId: req.user.id } : {};
    const requests = await CIBILRequestModel.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      requests,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCIBILStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { status, score, reportSummary } = req.body;
    const cibilReq = await CIBILRequestModel.findById(req.params.id);

    if (!cibilReq) {
      return next(new AppError("CIBIL request not found.", 404));
    }

    if (status) cibilReq.status = status;
    if (score) cibilReq.creditScore = score;
    if (reportSummary) cibilReq.reportSummary = reportSummary;

    await cibilReq.save();

    await AuditLogModel.create({
      action: "CIBIL_STATUS_UPDATED",
      actorId: req.user?.id || "system",
      actorEmail: req.user?.email || "system",
      actorRole: req.user?.role || "super_admin",
      targetId: cibilReq._id.toString(),
      details: `Updated CIBIL request status to ${status}`,
    });

    res.status(200).json({
      status: "success",
      cibilRequest: cibilReq,
    });
  } catch (error) {
    next(error);
  }
};
