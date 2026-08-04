import { Router } from "express";
import { getRTCData } from "../controllers/bhoomiController";
import { protect, requirePermission, restrictTo } from "../middlewares/authMiddleware";

const router = Router();

// Protect all routes, allowing admins and assistant admins with permission
router.use(protect);
router.use(restrictTo("super_admin", "assistant_admin"));

// In a real app, assistant admin would need specific 'view_bhoomi' permission
router.post("/rtc", requirePermission("view_bhoomi"), getRTCData);

export default router;
