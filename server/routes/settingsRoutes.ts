import { Router } from "express";
import { getSettings, updateSettings, getPartners, createPartner, deletePartner } from "../controllers/settingsController";
import { protect, restrictTo } from "../middlewares/authMiddleware";

const router = Router();

// Settings endpoints
router.get("/settings", protect, getSettings);
router.patch("/settings", protect, restrictTo("super_admin"), updateSettings);

// Partners endpoints (Read is public, write is restricted to Super Admin)
router.get("/partners", getPartners);
router.post("/partners", protect, restrictTo("super_admin"), createPartner);
router.delete("/partners/:id", protect, restrictTo("super_admin"), deletePartner);

export default router;
