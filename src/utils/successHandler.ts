import { NextFunction, Request, Response } from "express";

export const successHandler = (
  res: Response,
  status: number,
  message: string,
  data: any
) => {
  res.status(status).json({
    success: true,
    message: message,
    data: data,
  });
};
