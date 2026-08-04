import { Router } from "express";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController";
import { protect, restrictTo } from "../middlewares/authMiddleware";

const router = Router();

// Protect all task endpoints to staff only (Super Admin and Assistant Admin)
router.use(protect);
router.use(restrictTo("super_admin", "assistant_admin"));

router.route("/")
  .get(getTasks)
  .post(createTask);

router.route("/:id")
  .patch(updateTask)
  .delete(deleteTask);

export default router;
