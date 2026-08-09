import { Router } from "express";
import { protect, restrictTo } from "../middlewares/authMiddleware";
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomer360,
} from "../controllers/customerController";

const router = Router();

router.use(protect);

router.get("/", restrictTo("super_admin", "assistant_admin", "Admin", "AssistantAdmin"), getCustomers);
router.get("/360/:id", getCustomer360);
router.get("/:id", restrictTo("super_admin", "assistant_admin", "Admin", "AssistantAdmin"), getCustomerById);
router.post("/", restrictTo("super_admin", "assistant_admin"), createCustomer);
router.put("/:id", restrictTo("super_admin", "assistant_admin"), updateCustomer);
router.delete("/:id", restrictTo("super_admin"), deleteCustomer);

export default router;
