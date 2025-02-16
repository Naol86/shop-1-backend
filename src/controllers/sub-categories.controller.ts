import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";
import { successHandler } from "../utils/successHandler";
import { AppError } from "../utils/customClass";

export const getSubCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await prisma.subCategories.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    successHandler(res, 200, "sub categories fetched successfully", categories);
    return;
  } catch (err) {
    const error = new AppError(`Internal Server Error ${err}`, 500);
    next(error);
  }
};

export const createSubCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, name, description } = req.body;
    const category = await prisma.categories.findFirst({
      where: { id: parseInt(id) },
    });
    if (!category) {
      next(new AppError("Category not found", 404));
      return;
    }
    const image = req.file
      ? `/public/sub-categories/${req.file.filename}`
      : null;
    const newSubCategory = await prisma.subCategories.create({
      data: {
        name,
        description,
        image,
        categoryId: parseInt(id),
      },
    });
    successHandler(
      res,
      201,
      "Sub Category created successfully",
      newSubCategory
    );
  } catch (error) {
    console.log(error);
    next(new AppError(`Internal Server Error`, 500));
  }
};

export const getSubCategoriesByCategoryId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const category = await prisma.categories.findFirst({
      where: { id: parseInt(id) },
    });
    if (!category) {
      next(new AppError("Category not found", 404));
      return;
    }

    const subCategories = await prisma.subCategories.findMany({
      where: { categoryId: parseInt(id) },
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        category: {
          select: {
            id: true,
            name: true,
            image: true,
            description: true,
          },
        },
      },
    });

    if (!subCategories) {
      next(new AppError("Sub Category not found", 404));
      return;
    }
    successHandler(
      res,
      200,
      "sub category fetched successfully",
      subCategories
    );
  } catch (error) {
    console.log(error);
    next(new AppError(`Internal Server Error`, 500));
  }
};

export const getSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const subCategory = await prisma.subCategories.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        category: {
          select: {
            id: true,
            name: true,
            image: true,
            description: true,
          },
        },
      },
    });
    if (!subCategory) {
      next(new AppError("Sub Category not found", 404));
      return;
    }
    successHandler(res, 200, "sub category fetched successfully", subCategory);
  } catch (error) {
    console.log(error);
    next(new AppError(`Internal Server Error`, 500));
  }
};
