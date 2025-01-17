import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

interface Error {
  stack?: string;
  message: string;
  status?: number;
}

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500).json({ message: err.message, success: false });
};
