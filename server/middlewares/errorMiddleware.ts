import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  console.error(`[ERROR] [${req.method}] ${req.originalUrl}:`, err);

  // Return safe message without internal stack traces
  res.status(statusCode).json({
    status,
    message: err.message || "Internal server error occurred.",
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {})
  });
};
