import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { SupportTicketModel } from "../models/SupportTicket";
import { NotificationModel } from "../models/Notification";
import { ApplicationModel } from "../models/Application";
import { TaskModel } from "../models/Task";
import { UserModel } from "../models/User";
import { AuditLogModel } from "../models/AuditLog";
import { AppError } from "../middlewares/errorMiddleware";

// Notification Methods
export const getNotifications = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const filterQuery: any = {};
    
    if (user.role === "customer") {
      filterQuery.userId = user.id;
    }

    const notifications = await NotificationModel.find(filterQuery).sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      notifications
    });
  } catch (error) {
    next(error);
  }
};

export const markNotificationRead = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const notification = await NotificationModel.findById(req.params.id);
    if (!notification) return next(new AppError("Notification not found.", 404));

    notification.read = true;
    await notification.save();

    res.status(200).json({
      status: "success",
      notification
    });
  } catch (error) {
    next(error);
  }
};

// Support Chat/Ticket Methods
export const getTickets = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const filterQuery: any = {};

    if (user.role === "customer") {
      filterQuery.userId = user.id;
    }

    const tickets = await SupportTicketModel.find(filterQuery).sort({ updatedAt: -1 });

    res.status(200).json({
      status: "success",
      tickets
    });
  } catch (error) {
    next(error);
  }
};

export const createTicket = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { subject, initialMessage } = req.body;
    const user = req.user!;

    if (!subject || !initialMessage) {
      return next(new AppError("Subject and initial message are required.", 400));
    }

    const ticket = await SupportTicketModel.create({
      userId: user.id,
      userName: user.email || "Customer",
      subject,
      messages: [{
        sender: "customer",
        name: user.email || "Customer",
        content: initialMessage,
        sentAt: new Date()
      }]
    });

    res.status(201).json({
      status: "success",
      ticket
    });
  } catch (error) {
    next(error);
  }
};

export const replyTicket = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { content } = req.body;
    const user = req.user!;

    if (!content) return next(new AppError("Message content is required.", 400));

    const ticket = await SupportTicketModel.findById(req.params.id);
    if (!ticket) return next(new AppError("Ticket not found.", 404));

    // Enforce Ownership check for customers
    if (user.role === "customer" && ticket.userId?.toString() !== user.id) {
      return next(new AppError("Access Denied.", 403));
    }

    ticket.messages.push({
      sender: user.role === "customer" ? "customer" : (user.role === "super_admin" ? "admin" : "assistant_admin"),
      name: user.email || "User",
      content,
      sentAt: new Date()
    });

    if (user.role !== "customer") {
      ticket.status = "In Progress";
    } else {
      ticket.status = "Open";
    }

    await ticket.save();

    res.status(200).json({
      status: "success",
      ticket
    });
  } catch (error) {
    next(error);
  }
};

// Analytics Dashboard aggregations
export const getAnalyticsDashboard = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const totalApplications = await ApplicationModel.countDocuments();
    const pendingApplications = await ApplicationModel.countDocuments({ status: "Pending" });
    const approvedApplications = await ApplicationModel.countDocuments({ status: "Approved" });
    const rejectedApplications = await ApplicationModel.countDocuments({ status: "Rejected" });
    const inReviewApplications = await ApplicationModel.countDocuments({ status: "In Review" });

    const totalCustomers = await UserModel.countDocuments({ role: "customer" });
    const totalTasks = await TaskModel.countDocuments();
    const pendingTasks = await TaskModel.countDocuments({ status: "Pending" });

    // Calculate revenue (e.g. ₹42,000 commission fee per approved loan/insurance application)
    const approvedLoans = await ApplicationModel.find({ status: "Approved", productKind: "loan" });
    const approvedInsurance = await ApplicationModel.find({ status: "Approved", productKind: "insurance" });
    
    const loanRevenue = approvedLoans.reduce((sum, app) => sum + (app.amount * 0.02), 0); // 2% loan processing commission
    const insuranceRevenue = approvedInsurance.length * 5000; // Flat ₹5,000 commission on insurance
    const totalRevenue = loanRevenue + insuranceRevenue;

    // Loan vs Insurance distribution
    const loanCount = await ApplicationModel.countDocuments({ productKind: "loan" });
    const insuranceCount = await ApplicationModel.countDocuments({ productKind: "insurance" });

    // Recent audits
    const recentActivities = await AuditLogModel.find().sort({ createdAt: -1 }).limit(10);

    res.status(200).json({
      status: "success",
      metrics: {
        totalApplications,
        pendingApplications,
        approvedApplications,
        rejectedApplications,
        inReviewApplications,
        totalCustomers,
        totalTasks,
        pendingTasks,
        totalRevenue,
        loanRevenue,
        insuranceRevenue
      },
      distribution: {
        loans: loanCount,
        insurance: insuranceCount
      },
      recentActivities
    });
  } catch (error) {
    next(error);
  }
};
