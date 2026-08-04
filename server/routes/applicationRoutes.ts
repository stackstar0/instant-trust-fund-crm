import { Router } from "express";
import { apply, getApplications, getApplicationDetails, updateStatus, deleteApplication, uploadDoc } from "../controllers/applicationController";
import { protect, restrictTo } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/uploadMiddleware";

const router = Router();

// Public/Authenticated application submission
router.post("/apply", (req, res, next) => {
  // If user has token, run protect middleware, else bypass to allow anonymous submissions
  if (req.headers.authorization || (req.cookies && req.cookies.accessToken)) {
    return protect(req, res, next);
  }
  next();
}, apply);

// Protected application queries
router.get("/", protect, getApplications);
router.get("/:id", protect, getApplicationDetails);

// Status updates restricted to Admin & Assistant
router.patch("/:id/status", protect, restrictTo("super_admin", "assistant_admin"), updateStatus);

// Application deletions restricted strictly to Super Admin (R H Adhoni)
router.delete("/:id", protect, restrictTo("super_admin"), deleteApplication);

// Document upload endpoint linked to Multer upload middleware
router.post("/:applicationId/upload", (req, res, next) => {
  if (req.headers.authorization || (req.cookies && req.cookies.accessToken)) {
    return protect(req, res, next);
  }
  next();
}, upload.single("file"), uploadDoc);

export default router;
