import { Router } from "express";
import { protect, restrictTo } from "../middlewares/authMiddleware";
import {
  getSmsOverview,
  getSmsTemplates,
  createSmsTemplate,
  sendTestSms,
} from "../controllers/smsController";

const router = Router();

// Protect all SMS routes for authenticated admins
router.use(protect);
router.use(restrictTo("super_admin", "assistant_admin", "Admin", "AssistantAdmin"));

router.get("/overview", getSmsOverview);
router.get("/templates", getSmsTemplates);
router.post("/templates", createSmsTemplate);
router.post("/test-single", sendTestSms);

export default router;
