import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/customClass";

export const roleValidate = (requiredRole: "ADMIN" | "SUPERADMIN") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      const user = req.user;

      if (!user) {
        return next(new AppError("Unauthorized: No user found", 401));
      }

      // Check if the user has the required role
      if (user.role !== requiredRole) {
        return next(
          new AppError("Unauthorized: Insufficient permissions", 403)
        );
      }

      next(); // User has the required role, proceed
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};
