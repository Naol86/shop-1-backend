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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const successHandler_1 = require("../utils/successHandler");
const customClass_1 = require("../utils/customClass");
const getCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield prisma_1.default.categories.findMany({
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
        (0, successHandler_1.successHandler)(res, 200, "categories fetched successfully", categories);
        return;
    }
    catch (err) {
        const error = new customClass_1.AppError(`Internal Server Error ${err}`, 500);
        next(error);
    }
});
exports.getCategories = getCategories;
// Get a single category by ID
const getCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield prisma_1.default.categories.findUnique({
            where: { id: parseInt(id) },
            select: { id: true, name: true, description: true, image: true },
        });
        if (!category) {
            next(new customClass_1.AppError("Category not found", 404));
            return;
        }
        (0, successHandler_1.successHandler)(res, 200, "category fetched successfully", category);
    }
    catch (error) {
        next(new customClass_1.AppError(`Internal Server Error`, 500));
    }
});
exports.getCategory = getCategory;
// Create a new category
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const image = req.file ? `/public/categories/${req.file.filename}` : null;
        // console.log(image, "image is here");
        const newCategory = yield prisma_1.default.categories.create({
            data: {
                name,
                description,
                image, // Store filename instead of undefined value
            },
        });
        (0, successHandler_1.successHandler)(res, 201, "Category created successfully", newCategory);
    }
    catch (error) {
        next(new customClass_1.AppError(`Internal Server Error`, 500));
    }
});
exports.createCategory = createCategory;
// Update an existing category by ID
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, image } = req.body;
        const category = yield prisma_1.default.categories.findUnique({
            where: { id: parseInt(id) },
        });
        if (!category) {
            next(new customClass_1.AppError("Category not found", 404));
            return;
        }
        const updatedCategory = yield prisma_1.default.categories.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                image,
            },
        });
        res.status(200).json(updatedCategory);
    }
    catch (error) {
        next(new customClass_1.AppError(`Internal Server Error`, 500));
    }
});
exports.updateCategory = updateCategory;
// Delete a category by ID
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield prisma_1.default.categories.findUnique({
            where: { id: parseInt(id) },
        });
        if (!category) {
            next(new customClass_1.AppError("Category not found", 404));
            return;
        }
        yield prisma_1.default.categories.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    }
    catch (error) {
        next(new customClass_1.AppError(`Internal Server Error`, 500));
    }
});
exports.deleteCategory = deleteCategory;
