import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import {
  createOrder,
  verifyPayment,
  handleWebhook,
  getPaymentHistory,
} from "../controllers/paymentController";

const router = Router();

router.post("/webhook", handleWebhook);

router.use(protect);

router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);
router.get("/history", getPaymentHistory);

export default router;
