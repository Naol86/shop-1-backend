import { Request, Response, NextFunction } from "express";
import prisma from "../config/prisma";
import { successHandler } from "../utils/successHandler";
import { AppError } from "../utils/customClass";
import { parse } from "path";

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await prisma.categories.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        SubCategories: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    successHandler(res, 200, "categories fetched successfully", categories);
    return;
  } catch (err) {
    const error = new AppError(`Internal Server Error ${err}`, 500);
    next(error);
  }
};

// Get a single category by ID
export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const category = await prisma.categories.findUnique({
      where: { id: parseInt(id) },
      select: { id: true, name: true, description: true, image: true },
    });

    if (!category) {
      next(new AppError("Category not found", 404));
      return;
    }
    successHandler(res, 200, "category fetched successfully", category);
  } catch (error) {
    next(new AppError(`Internal Server Error`, 500));
  }
};

// Create a new category
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? `/public/categories/${req.file.filename}` : null;

    // console.log(image, "image is here");

    const newCategory = await prisma.categories.create({
      data: {
        name,
        description,
        image, // Store filename instead of undefined value
      },
    });

    successHandler(res, 201, "Category created successfully", newCategory);
  } catch (error) {
    next(new AppError(`Internal Server Error`, 500));
  }
};

// Update an existing category by ID
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, description, image } = req.body;

    const category = await prisma.categories.findUnique({
      where: { id: parseInt(id) },
    });
    if (!category) {
      next(new AppError("Category not found", 404));
      return;
    }

    const updatedCategory = await prisma.categories.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        image,
      },
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(new AppError(`Internal Server Error`, 500));
  }
};

// Delete a category by ID
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const category = await prisma.categories.findUnique({
      where: { id: parseInt(id) },
    });
    if (!category) {
      next(new AppError("Category not found", 404));
      return;
    }

    await prisma.categories.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    next(new AppError(`Internal Server Error`, 500));
  }
};
