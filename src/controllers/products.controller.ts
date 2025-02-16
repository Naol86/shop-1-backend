import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/customClass";
import prisma from "../config/prisma";
import { successHandler } from "../utils/successHandler";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price, categoryId, subCategoryId } = req.body;

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return next(new AppError("At least one product image is required", 400));
    }

    // Get uploaded image URLs
    const imageFiles = req.files as Express.Multer.File[];
    const imageUrls = imageFiles.map(
      (file) => `/public/products/${file.filename}`
    );

    // Create product in database
    const newProduct = await prisma.products.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        categoryId: parseInt(categoryId),
        subCategoryId: parseInt(subCategoryId),
        images: {
          create: imageUrls.map((url) => ({ imageUrl: url })), // Save images
        },
      },
      include: { images: true },
    });

    successHandler(res, 201, "Product created successfully", newProduct);
  } catch (error) {
    next(new AppError(`Internal Server Error`, 500));
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId, subCategoryId, minPrice, maxPrice, sortBy } = req.query;

    // Build the filter object dynamically
    const filters: any = {};

    // Category filter
    if (categoryId) {
      filters.categoryId = Number(categoryId);
    }

    // SubCategory filter
    if (subCategoryId) {
      filters.subCategoryId = Number(subCategoryId);
    }

    // Price filters
    if (minPrice && maxPrice) {
      filters.price = {
        gte: Number(minPrice), // Greater than or equal to minPrice
        lte: Number(maxPrice), // Less than or equal to maxPrice
      };
    } else if (minPrice) {
      filters.price = {
        gte: Number(minPrice),
      };
    } else if (maxPrice) {
      filters.price = {
        lte: Number(maxPrice),
      };
    }

    // Sorting logic
    const orderBy =
      sortBy === "newest" ? { createdAt: "desc" as const } : undefined;

    // Fetch products with applied filters
    const products = await prisma.products.findMany({
      where: filters,
      orderBy,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        createdAt: true,
        category: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        subCategory: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        images: {
          select: {
            id: true,
            imageUrl: true,
          },
        },
      },
    });

    successHandler(res, 200, "Products fetched successfully", products);
  } catch (error) {
    next(new AppError("Internal Server Error", 500));
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await prisma.products.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        createdAt: true,
        category: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        subCategory: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        images: {
          select: {
            id: true,
            imageUrl: true,
          },
        },
      },
    });

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    successHandler(res, 200, "Product fetched successfully", product);
  } catch (error) {
    next(new AppError(`Internal Server Error`, 500));
  }
};

export const getProductsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const products = await prisma.products.findMany({
      where: { categoryId: parseInt(id) },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        createdAt: true,
        category: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        subCategory: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        images: {
          select: {
            id: true,
            imageUrl: true,
          },
        },
      },
    });

    if (products.length === 0) {
      return next(new AppError("No products found", 404));
    }

    successHandler(res, 200, "Products fetched successfully", products);
  } catch (error) {
    next(new AppError(`Internal Server Error`, 500));
  }
};

export const getProductsBySubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const products = await prisma.products.findMany({
      where: {
        subCategoryId: parseInt(id),
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        createdAt: true,
        category: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        subCategory: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        images: {
          select: {
            id: true,
            imageUrl: true,
          },
        },
      },
    });
    if (products.length === 0) {
      return next(new AppError("No products found", 404));
    }

    successHandler(res, 200, "Products fetched successfully", products);
  } catch (error) {
    next(new AppError(`Internal Server Error`, 500));
  }
};
