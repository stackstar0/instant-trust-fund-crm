import { Response, NextFunction } from "express";
import mongoose from "mongoose";
import { AuthRequest } from "../middlewares/authMiddleware";
import { CustomerModel } from "../models/Customer";
import { UserModel } from "../models/User";
import { LoanModel } from "../models/Loan";
import { PaymentHistoryModel } from "../models/PaymentHistory";
import { InsuranceModel } from "../models/Insurance";
import { SmsLogModel } from "../models/SmsLog";
import { AuditLogModel } from "../models/AuditLog";
import { AppError } from "../middlewares/errorMiddleware";

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

export const getCustomer360 = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const userRole = req.user?.role;
    
    // Find user (customer)
    // Redact panNumber and aadhaarNumber if AssistantAdmin
    const userQuery = UserModel.findById(userId);
    if (userRole === "AssistantAdmin" || userRole === "assistant_admin") {
      userQuery.select("-panNumber -aadhaarNumber");
    } else {
      userQuery.select("+panNumber +aadhaarNumber");
    }
    
    const user = await userQuery.lean();
    if (!user) {
      return next(new AppError("User not found.", 404));
    }

    // Fetch related records concurrently
    const objectIdUserId = new mongoose.Types.ObjectId(userId);
    const [loans, payments, insurance, smsLogs] = await Promise.all([
      LoanModel.find({ userId: objectIdUserId }).sort({ createdAt: -1 }).lean(),
      PaymentHistoryModel.find({ userId: objectIdUserId }).sort({ paymentDate: -1 }).lean(),
      InsuranceModel.find({ userId: objectIdUserId }).sort({ endDate: -1 }).lean(),
      SmsLogModel.find({ userId: objectIdUserId }).sort({ sentAt: -1 }).limit(50).lean()
    ]);

    let analytics = null;
    if (userRole === "Admin" || userRole === "super_admin") {
      analytics = {
        totalLoans: loans.length,
        totalOutstanding: loans.reduce((acc, loan) => acc + loan.outstandingAmount, 0),
        totalPayments: payments.reduce((acc, payment) => acc + payment.amountPaid, 0)
      };
    }

    res.status(200).json({
      status: "success",
      data: {
        profile: user,
        loans,
        payments,
        insurance,
        smsLogs,
        ...(analytics ? { analytics } : {})
      }
    });
  } catch (error) {
    next(error);
  }
};
