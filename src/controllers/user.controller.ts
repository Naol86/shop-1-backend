import { NextFunction, Request, Response } from "express";
import { successHandler } from "../utils/successHandler";
import { AppError } from "../utils/customClass";
import { generateAccessToken } from "../utils/JWTToken";
import prisma from "../config/prisma";
import bcrypt from "bcrypt";

export const CreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    const error = new AppError("User already exists", 409);
    next(error);
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
  if (user) {
    const { password, ...newUser } = user;
    successHandler(res, 201, "user created", newUser);
    return;
  }
  const error = new Error("Error creating a new user please try again later");
  next(error);
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await prisma.user.findUnique({ where: { email } });
  console.log(user);
  if (!user) {
    const error = new AppError("User does not exist", 404);
    next(error);
    return;
  }
  if (user.password !== password) {
    const error = new AppError("Invalid email or password", 401);
    next(error);
    return;
  }
  const accessToken = generateAccessToken(user);
  if (!accessToken) {
    const error = new AppError("Please try again later", 500);
    next(error);
    return;
  }
  successHandler(res, 200, "login successful", { user, accessToken });
};

export { CreateUser as createUser };
