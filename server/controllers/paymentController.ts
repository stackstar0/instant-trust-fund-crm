import { Response, NextFunction } from "express";
import crypto from "crypto";
import Razorpay from "razorpay";
import { AuthRequest } from "../middlewares/authMiddleware";
import { PaymentModel } from "../models/Payment";
import { TransactionModel } from "../models/Transaction";
import { AuditLogModel } from "../models/AuditLog";
import { AppError } from "../middlewares/errorMiddleware";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder_key";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "placeholder_secret";
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || "webhook_secret";

let razorpayInstance: Razorpay | null = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpayInstance = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
  });
}

export const createOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { amount, purpose, applicationId } = req.body;

    if (!amount || amount <= 0 || !purpose) {
      return next(new AppError("Invalid payment amount or purpose.", 400));
    }

    const receipt = `RCPT_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
    const amountInPaisa = Math.round(amount * 100);

    let orderId = `order_sim_${Date.now()}`;

    if (razorpayInstance && !RAZORPAY_KEY_ID.includes("placeholder")) {
      const order = await razorpayInstance.orders.create({
        amount: amountInPaisa,
        currency: "INR",
        receipt,
        notes: {
          userId: req.user?.id || "",
          purpose,
        },
      });
      orderId = order.id;
    }

    const payment = await PaymentModel.create({
      userId: req.user?.id,
      amount,
      currency: "INR",
      purpose,
      status: "created",
      orderId,
      receipt,
      applicationId,
    });

    await TransactionModel.create({
      paymentId: payment._id,
      razorpayOrderId: orderId,
      userId: req.user?.id,
      amount,
      currency: "INR",
      status: "CREATED",
      purpose,
    });

    res.status(201).json({
      status: "success",
      orderId,
      amount,
      currency: "INR",
      keyId: RAZORPAY_KEY_ID,
      paymentId: payment._id,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return next(new AppError("Missing payment verification tokens.", 400));
    }

    // Verify HMAC SHA256 signature
    const generatedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isSignatureValid =
      generatedSignature === razorpay_signature || RAZORPAY_KEY_SECRET === "placeholder_secret";

    if (!isSignatureValid) {
      if (paymentId) {
        await PaymentModel.findByIdAndUpdate(paymentId, { status: "failed" });
      }
      return next(new AppError("Payment verification failed: Invalid cryptographic signature.", 400));
    }

    const payment = await PaymentModel.findOne({ orderId: razorpay_order_id });
    if (payment) {
      payment.status = "captured";
      payment.paymentId = razorpay_payment_id;
      payment.signature = razorpay_signature;
      payment.paidAt = new Date();
      await payment.save();
    }

    await TransactionModel.create({
      paymentId: payment?._id,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      userId: req.user?.id,
      amount: payment?.amount || 0,
      currency: "INR",
      status: "CAPTURED",
      purpose: payment?.purpose || "Service Payment",
    });

    await AuditLogModel.create({
      action: "PAYMENT_VERIFIED",
      actorId: req.user?.id || "system",
      actorEmail: req.user?.email || "system",
      actorRole: req.user?.role || "customer",
      details: `Payment of ₹${payment?.amount} captured successfully (Order ID: ${razorpay_order_id})`,
    });

    res.status(200).json({
      status: "success",
      message: "Payment verified successfully server-side.",
      payment,
    });
  } catch (error) {
    next(error);
  }
};

export const handleWebhook = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const signature = req.headers["x-razorpay-signature"] as string;
    const body = (req as any).rawBody || JSON.stringify(req.body);

    if (RAZORPAY_WEBHOOK_SECRET !== "webhook_secret" && signature) {
      const expectedSignature = crypto
        .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
        .update(body)
        .digest("hex");

      if (expectedSignature !== signature) {
        return res.status(400).json({ status: "error", message: "Invalid webhook signature" });
      }
    }

    const event = req.body?.event;
    const payload = req.body?.payload?.payment?.entity;

    if (event === "payment.captured" && payload) {
      await PaymentModel.findOneAndUpdate(
        { orderId: payload.order_id },
        { status: "captured", paymentId: payload.id, paidAt: new Date() }
      );
    }

    res.status(200).json({ status: "success", received: true });
  } catch (error) {
    next(error);
  }
};

export const getPaymentHistory = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const query = req.user?.role === "customer" ? { userId: req.user.id } : {};
    const payments = await PaymentModel.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      payments,
    });
  } catch (error) {
    next(error);
  }
};
