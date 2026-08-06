import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { CustomerModel } from "../models/Customer";
import { AuditLogModel } from "../models/AuditLog";
import { AppError } from "../middlewares/errorMiddleware";
import * as xlsx from "xlsx";
import pdfParse from "pdf-parse";
import { PropertyRequestModel } from "../models/PropertyRequest";

export const getCustomers = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const search = req.query.search as string;
    const source = req.query.source as string;
    const district = req.query.district as string;
    const kycStatus = req.query.kycStatus as string;

    const query: any = { isDeleted: false };

    if (source) query.source = source;
    if (district) query.district = new RegExp(district, "i");
    if (kycStatus) query.kycStatus = kycStatus;

    if (search) {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [{ fullName: searchRegex }, { mobile: searchRegex }, { city: searchRegex }];
    }

    const total = await CustomerModel.countDocuments(query);
    const customers = await CustomerModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Mask phone numbers if user is not authorized staff
    const userRole = req.user?.role;
    const isStaff = userRole === "super_admin" || userRole === "assistant_admin";

    const sanitizedCustomers = customers.map((c) => {
      if (!isStaff) {
        return {
          ...c,
          mobile: c.mobile ? `${c.mobile.slice(0, 3)}*****${c.mobile.slice(-2)}` : "*****",
        };
      }
      return c;
    });

    res.status(200).json({
      status: "success",
      total,
      page,
      pages: Math.ceil(total / limit),
      customers: sanitizedCustomers,
    });
  } catch (error) {
    next(error);
  }
};

export const getCustomerById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const customer = await CustomerModel.findById(req.params.id);
    if (!customer || customer.isDeleted) {
      return next(new AppError("Customer record not found.", 404));
    }

    res.status(200).json({
      status: "success",
      customer,
    });
  } catch (error) {
    next(error);
  }
};

export const createCustomer = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { fullName, mobile, email, city, district, state, pincode, occupation, monthlyIncome } = req.body;

    if (!fullName || !mobile) {
      return next(new AppError("Full name and mobile number are required.", 400));
    }

    const cleanMobile = mobile.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      return next(new AppError("Invalid 10-digit Indian mobile number.", 400));
    }

    const existing = await CustomerModel.findOne({ mobile: cleanMobile, isDeleted: false });
    if (existing) {
      return next(new AppError("A customer with this mobile number already exists.", 400));
    }

    const customer = await CustomerModel.create({
      fullName,
      normalizedName: fullName.toLowerCase().trim(),
      mobile: cleanMobile,
      email,
      city,
      district,
      state: state || "Karnataka",
      pincode,
      occupation,
      monthlyIncome,
      source: "manual",
      isImported: false,
    });

    await AuditLogModel.create({
      action: "CREATE_CUSTOMER",
      actorId: req.user?.id || "system",
      actorEmail: req.user?.email || "system",
      actorRole: req.user?.role || "super_admin",
      targetId: customer._id.toString(),
      details: `Created customer profile for ${fullName} (${cleanMobile})`,
    });

    res.status(201).json({
      status: "success",
      customer,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCustomer = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const customer = await CustomerModel.findById(req.params.id);
    if (!customer || customer.isDeleted) {
      return next(new AppError("Customer record not found.", 404));
    }

    Object.assign(customer, req.body);
    if (req.body.fullName) {
      customer.normalizedName = req.body.fullName.toLowerCase().trim();
    }

    await customer.save();

    await AuditLogModel.create({
      action: "UPDATE_CUSTOMER",
      actorId: req.user?.id || "system",
      actorEmail: req.user?.email || "system",
      actorRole: req.user?.role || "super_admin",
      targetId: customer._id.toString(),
      details: `Updated customer profile ${customer.fullName}`,
    });

    res.status(200).json({
      status: "success",
      customer,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const customer = await CustomerModel.findById(req.params.id);
    if (!customer || customer.isDeleted) {
      return next(new AppError("Customer record not found.", 404));
    }

    customer.isDeleted = true;
    customer.deletedAt = new Date();
    customer.deletedBy = req.user?.email;
    await customer.save();

    await AuditLogModel.create({
      action: "DELETE_CUSTOMER",
      actorId: req.user?.id || "system",
      actorEmail: req.user?.email || "system",
      actorRole: req.user?.role || "super_admin",
      targetId: customer._id.toString(),
      details: `Soft deleted customer ${customer.fullName}`,
    });

    res.status(200).json({
      status: "success",
      message: "Customer record deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const bulkUploadCustomers = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return next(new AppError("Please upload an Excel or PDF file.", 400));
    }

    let extractedData: any[] = [];
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname.toLowerCase();

    // 1. Process Excel / CSV Files
    if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls") || fileName.endsWith(".csv")) {
      const workbook = xlsx.read(fileBuffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      extractedData = sheetData.map((row: any) => ({
        fullName: row["Name"] || row["Customer Name"] || "Unknown",
        email: row["Email"] || row["Email Address"] || `user_${Date.now()}@instanttrustfunds.com`,
        mobile: String(row["Phone"] || row["Mobile Number"] || row["Contact"] || "").replace(/\D/g, ""),
        district: row["District"] || "Karnataka",
        taluk: row["Taluk"] || "",
        village: row["Village"] || "",
        surveyNumber: String(row["Survey Number"] || row["Survey No"] || ""),
        amount: Number(row["Loan Amount"] || row["Amount"] || 0),
      }));
    }
    // 2. Process PDF Files
    else if (fileName.endsWith(".pdf")) {
      const pdfData = await pdfParse(fileBuffer);
      const text = pdfData.text;

      // Extract details using RegEx patterns from document text
      const phoneMatches = text.match(/(?:\+91|0)?[6-9]\d{9}/g) || [];
      const emailMatches = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
      const surveyMatches = text.match(/Survey\s*(?:No|Number)?:?\s*([0-9\/\-]+)/gi) || [];

      let cleanMobile = phoneMatches[0] ? phoneMatches[0].replace(/\D/g, "") : "";
      if (cleanMobile.length > 10 && cleanMobile.startsWith("91")) cleanMobile = cleanMobile.slice(2);
      if (cleanMobile.length > 10 && cleanMobile.startsWith("0")) cleanMobile = cleanMobile.slice(1);

      extractedData.push({
        fullName: "PDF Extracted Customer",
        email: emailMatches[0] || `pdf_user_${Date.now()}@instanttrustfunds.com`,
        mobile: cleanMobile,
        surveyNumber: surveyMatches[0] ? surveyMatches[0].replace(/Survey\s*(?:No|Number)?:?\s*/i, "") : "",
        district: "Karnataka",
        amount: 0,
      });
    } else {
      return next(new AppError("Unsupported file format. Upload .xlsx, .csv, or .pdf", 400));
    }

    let importedCount = 0;
    
    for (const record of extractedData) {
      if (!record.mobile) continue;

      let user = await CustomerModel.findOne({ mobile: record.mobile });

      if (!user) {
        user = await CustomerModel.create({
          fullName: record.fullName,
          normalizedName: record.fullName.toLowerCase().trim(),
          mobile: record.mobile,
          email: record.email,
          district: record.district,
          state: "Karnataka",
          source: "imported",
          isImported: true,
        });
      }

      // Create linked property verification request if survey number exists
      if (record.surveyNumber) {
        await PropertyRequestModel.create({
          userId: req.user?.id,
          applicantName: user.fullName,
          applicantMobile: user.mobile,
          surveyNumber: record.surveyNumber,
          district: record.district,
          taluk: record.taluk,
          village: record.village,
          propertyType: "Agricultural",
          propertyId: `PROP_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`,
          ownerName: user.fullName,
          status: "Pending",
        });
      }

      importedCount++;
    }

    await AuditLogModel.create({
      action: "BULK_IMPORT",
      actorId: req.user?.id || "system",
      actorEmail: req.user?.email || "system",
      actorRole: req.user?.role || "super_admin",
      targetId: "BULK",
      details: `Imported ${importedCount} records from ${fileName}`,
    });

    res.status(200).json({
      status: "success",
      message: `Successfully imported ${importedCount} customer records.`,
      count: importedCount,
    });
  } catch (error) {
    next(error);
  }
};
