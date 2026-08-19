import { Router } from "express";
import { protect, restrictTo } from "../middlewares/authMiddleware";
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  bulkUploadCustomers,
  getCustomer360,
} from "../controllers/customerController";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.use(protect);

router.get("/", restrictTo("super_admin", "assistant_admin", "Admin", "AssistantAdmin"), getCustomers);
router.post("/upload-bulk", restrictTo("super_admin", "assistant_admin", "Admin", "AssistantAdmin"), upload.single("file"), bulkUploadCustomers);
router.get("/360/:id", getCustomer360);
router.get("/:id", restrictTo("super_admin", "assistant_admin", "Admin", "AssistantAdmin"), getCustomerById);
router.post("/", restrictTo("super_admin", "assistant_admin", "Admin", "AssistantAdmin"), createCustomer);
router.put("/:id", restrictTo("super_admin", "assistant_admin", "Admin", "AssistantAdmin"), updateCustomer);
router.delete("/:id", restrictTo("super_admin", "Admin"), deleteCustomer);

export default router;
