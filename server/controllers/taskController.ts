import { Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { TaskModel } from "../models/Task";
import { AppError } from "../middlewares/errorMiddleware";

export const getTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const filterQuery: any = {};

    // Assistants can view all tasks or only tasks assigned to them. Let's let them view all, or specify filtering
    const { assignedTo, status } = req.query;
    if (assignedTo) filterQuery.assignedTo = assignedTo;
    if (status) filterQuery.status = status;

    const tasks = await TaskModel.find(filterQuery).sort({ dueDate: 1, createdAt: -1 });

    res.status(200).json({
      status: "success",
      tasks
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title, description, priority, assignedTo, dueDate } = req.body;

    if (!title) return next(new AppError("Task title is required.", 400));

    const task = await TaskModel.create({
      title,
      description,
      priority,
      assignedTo,
      dueDate
    });

    res.status(201).json({
      status: "success",
      task
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, assignedTo, dueDate } = req.body;

    const task = await TaskModel.findById(req.params.id);
    if (!task) return next(new AppError("Task not found.", 404));

    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (assignedTo) task.assignedTo = assignedTo;
    if (dueDate) task.dueDate = new Date(dueDate);

    await task.save();

    res.status(200).json({
      status: "success",
      task
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const task = await TaskModel.findByIdAndDelete(req.params.id);
    if (!task) return next(new AppError("Task not found.", 404));

    res.status(200).json({
      status: "success",
      message: "Task deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};
