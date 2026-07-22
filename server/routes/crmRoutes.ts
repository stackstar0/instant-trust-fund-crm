import { Router } from "express";
import { getNotifications, markNotificationRead, getTickets, createTicket, replyTicket, getAnalyticsDashboard } from "../controllers/crmController";
import { protect, restrictTo } from "../middlewares/authMiddleware";

const router = Router();

// Notifications
router.get("/notifications", protect, getNotifications);
router.patch("/notifications/:id/read", protect, markNotificationRead);

// Support Chat/Tickets
router.get("/tickets", protect, getTickets);
router.post("/tickets", protect, createTicket);
router.post("/tickets/:id/reply", protect, replyTicket);

// Analytics Dashboard (Staff only)
router.get("/analytics", protect, restrictTo("super_admin", "assistant_admin"), getAnalyticsDashboard);

export default router;
