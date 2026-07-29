import { Router } from "express";
import { protect, restrictTo } from "../middlewares/authMiddleware";
import {
  requestCIBILCheck,
  getCIBILRequests,
  updateCIBILStatus,
} from "../controllers/cibilController";

const router = Router();

router.use(protect);

router.post("/request", requestCIBILCheck);
router.get("/", getCIBILRequests);
router.put("/:id/status", restrictTo("super_admin", "assistant_admin"), updateCIBILStatus);

export default router;
