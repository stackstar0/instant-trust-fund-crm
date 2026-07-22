import { Schema, model, Document as MongooseDocument } from "mongoose";

export interface ITask extends MongooseDocument {
  title: string;
  description?: string;
  status: "Pending" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  assignedTo: string; // Employee or Admin name
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: { type: String, default: "Pending", enum: ["Pending", "In Progress", "Completed"] },
    priority: { type: String, default: "Medium", enum: ["Low", "Medium", "High"] },
    assignedTo: { type: String, default: "Unassigned", index: true },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export const TaskModel = model<ITask>("Task", TaskSchema);
