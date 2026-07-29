import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { PropertyRequestModel } from "../models/PropertyRequest";
import { AuditLogModel } from "../models/AuditLog";
import { AppError } from "../middlewares/errorMiddleware";

export const createPropertyRequest = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const {
      applicantName,
      applicantMobile,
      surveyNumber,
      village,
      taluk,
      district,
      propertyType,
      latitude,
      longitude,
      ownerName,
      ownerAddress,
      ownerPhone,
    } = req.body;

    if (!applicantName || !applicantMobile || !surveyNumber || !village || !taluk || !district) {
      return next(
        new AppError(
          "Applicant name, mobile, survey number, village, taluk, and district are required.",
          400
        )
      );
    }

    const propReq = await PropertyRequestModel.create({
      userId: req.user?.id,
      applicantName,
      applicantMobile,
      surveyNumber,
      village,
      taluk,
      district,
      propertyType: propertyType || "Agricultural",
      latitude: latitude ? parseFloat(latitude) : 15.4312,
      longitude: longitude ? parseFloat(longitude) : 75.6321,
      propertyId: `PROP_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`,
      ownerName: ownerName || "Private Landowner",
      ownerAddress: ownerAddress || `${village}, ${taluk}, ${district}`,
      ownerPhone: ownerPhone || applicantMobile,
      status: "Pending",
    });

    await AuditLogModel.create({
      action: "PROPERTY_VERIFICATION_REQUESTED",
      actorId: req.user?.id || "anonymous",
      actorEmail: req.user?.email || "anonymous",
      actorRole: req.user?.role || "customer",
      targetId: propReq._id.toString(),
      details: `Submitted property verification for Survey No. ${surveyNumber}, ${village}`,
    });

    res.status(201).json({
      status: "success",
      propertyRequest: propReq,
    });
  } catch (error) {
    next(error);
  }
};

export const getPropertyRequests = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userRole = req.user?.role;
    const isStaff = userRole === "super_admin" || userRole === "assistant_admin";

    // Staff can view ownerName/Address/Phone; Public/Customers cannot see raw owner info
    const selectFields = isStaff ? "+ownerName +ownerAddress +ownerPhone" : "";

    const query = !isStaff ? { userId: req.user?.id } : {};
    const requests = await PropertyRequestModel.find(query)
      .select(selectFields)
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      requests,
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicPropertyMapData = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // PUBLIC endpoint — NO owner information or sensitive applicant data exposed
    const properties = await PropertyRequestModel.find({ status: "Verified" })
      .select("surveyNumber village taluk district propertyType latitude longitude propertyId status createdAt")
      .lean();

    res.status(200).json({
      status: "success",
      properties,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePropertyStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { status, verificationNotes, assignedTo } = req.body;
    const propReq = await PropertyRequestModel.findById(req.params.id);

    if (!propReq) {
      return next(new AppError("Property request not found.", 404));
    }

    if (status) propReq.status = status;
    if (verificationNotes) propReq.verificationNotes = verificationNotes;
    if (assignedTo) propReq.assignedTo = assignedTo;

    await propReq.save();

    await AuditLogModel.create({
      action: "PROPERTY_STATUS_UPDATED",
      actorId: req.user?.id || "system",
      actorEmail: req.user?.email || "system",
      actorRole: req.user?.role || "super_admin",
      targetId: propReq._id.toString(),
      details: `Updated property verification status to ${status}`,
    });

    res.status(200).json({
      status: "success",
      propertyRequest: propReq,
    });
  } catch (error) {
    next(error);
  }
};
