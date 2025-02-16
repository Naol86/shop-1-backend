"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsBySubCategory = exports.getProductsByCategory = exports.getProduct = exports.getProducts = exports.createProduct = void 0;
const customClass_1 = require("../utils/customClass");
const prisma_1 = __importDefault(require("../config/prisma"));
const successHandler_1 = require("../utils/successHandler");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, categoryId, subCategoryId } = req.body;
        if (!req.files || req.files.length === 0) {
            return next(new customClass_1.AppError("At least one product image is required", 400));
        }
        // Get uploaded image URLs
        const imageFiles = req.files;
        const imageUrls = imageFiles.map((file) => `/public/products/${file.filename}`);
        // Create product in database
        const newProduct = yield prisma_1.default.products.create({
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
        (0, successHandler_1.successHandler)(res, 201, "Product created successfully", newProduct);
    }
    catch (error) {
        next(new customClass_1.AppError(`Internal Server Error`, 500));
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId, subCategoryId, minPrice, maxPrice, sortBy } = req.query;
        // Build the filter object dynamically
        const filters = {};
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
        }
        else if (minPrice) {
            filters.price = {
                gte: Number(minPrice),
            };
        }
        else if (maxPrice) {
            filters.price = {
                lte: Number(maxPrice),
            };
        }
        // Sorting logic
        const orderBy = sortBy === "newest" ? { createdAt: "desc" } : undefined;
        // Fetch products with applied filters
        const products = yield prisma_1.default.products.findMany({
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
        (0, successHandler_1.successHandler)(res, 200, "Products fetched successfully", products);
    }
    catch (error) {
        next(new customClass_1.AppError("Internal Server Error", 500));
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield prisma_1.default.products.findUnique({
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
            return next(new customClass_1.AppError("Product not found", 404));
        }
        (0, successHandler_1.successHandler)(res, 200, "Product fetched successfully", product);
    }
    catch (error) {
        next(new customClass_1.AppError(`Internal Server Error`, 500));
    }
});
exports.getProduct = getProduct;
const getProductsByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const products = yield prisma_1.default.products.findMany({
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
            return next(new customClass_1.AppError("No products found", 404));
        }
        (0, successHandler_1.successHandler)(res, 200, "Products fetched successfully", products);
    }
    catch (error) {
        next(new customClass_1.AppError(`Internal Server Error`, 500));
    }
});
exports.getProductsByCategory = getProductsByCategory;
const getProductsBySubCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const products = yield prisma_1.default.products.findMany({
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
            return next(new customClass_1.AppError("No products found", 404));
        }
        (0, successHandler_1.successHandler)(res, 200, "Products fetched successfully", products);
    }
    catch (error) {
        next(new customClass_1.AppError(`Internal Server Error`, 500));
    }
});
exports.getProductsBySubCategory = getProductsBySubCategory;
