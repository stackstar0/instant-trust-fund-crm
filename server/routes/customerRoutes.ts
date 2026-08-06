import { Router } from "express";
import { protect, restrictTo } from "../middlewares/authMiddleware";
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  bulkUploadCustomers,
} from "../controllers/customerController";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.use(protect);

router.get("/", restrictTo("super_admin", "assistant_admin"), getCustomers);
router.post("/upload-bulk", restrictTo("super_admin", "assistant_admin"), upload.single("file"), bulkUploadCustomers);
router.get("/:id", restrictTo("super_admin", "assistant_admin"), getCustomerById);
router.post("/", restrictTo("super_admin", "assistant_admin"), createCustomer);
router.put("/:id", restrictTo("super_admin", "assistant_admin"), updateCustomer);
router.delete("/:id", restrictTo("super_admin"), deleteCustomer);

export default router;
