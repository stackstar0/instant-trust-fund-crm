import { Router } from "express";
import { protect, restrictTo } from "../middlewares/authMiddleware";
import {
  createPropertyRequest,
  getPropertyRequests,
  getPublicPropertyMapData,
  updatePropertyStatus,
} from "../controllers/propertyController";

const router = Router();

// Public property map route (NO PII / NO owner info exposed)
router.get("/public-map", getPublicPropertyMapData);

router.use(protect);

router.post("/request", createPropertyRequest);
router.get("/", getPropertyRequests);
router.put("/:id/status", restrictTo("super_admin", "assistant_admin"), updatePropertyStatus);

export default router;
