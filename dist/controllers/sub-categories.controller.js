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
exports.getSubCategory = exports.getSubCategoriesByCategoryId = exports.createSubCategories = exports.getSubCategories = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const successHandler_1 = require("../utils/successHandler");
const customClass_1 = require("../utils/customClass");
const getSubCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield prisma_1.default.subCategories.findMany({
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
        (0, successHandler_1.successHandler)(res, 200, "sub categories fetched successfully", categories);
        return;
    }
    catch (err) {
        const error = new customClass_1.AppError(`Internal Server Error ${err}`, 500);
        next(error);
    }
});
exports.getSubCategories = getSubCategories;
const createSubCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, description } = req.body;
        const category = yield prisma_1.default.categories.findFirst({
            where: { id: parseInt(id) },
        });
        if (!category) {
            next(new customClass_1.AppError("Category not found", 404));
            return;
        }
        const image = req.file
            ? `/public/sub-categories/${req.file.filename}`
            : null;
        const newSubCategory = yield prisma_1.default.subCategories.create({
            data: {
                name,
                description,
                image,
                categoryId: parseInt(id),
            },
        });
        (0, successHandler_1.successHandler)(res, 201, "Sub Category created successfully", newSubCategory);
    }
    catch (error) {
        console.log(error);
        next(new customClass_1.AppError(`Internal Server Error`, 500));
    }
});
exports.createSubCategories = createSubCategories;
const getSubCategoriesByCategoryId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield prisma_1.default.categories.findFirst({
            where: { id: parseInt(id) },
        });
        if (!category) {
            next(new customClass_1.AppError("Category not found", 404));
            return;
        }
        const subCategories = yield prisma_1.default.subCategories.findMany({
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
            next(new customClass_1.AppError("Sub Category not found", 404));
            return;
        }
        (0, successHandler_1.successHandler)(res, 200, "sub category fetched successfully", subCategories);
    }
    catch (error) {
        console.log(error);
        next(new customClass_1.AppError(`Internal Server Error`, 500));
    }
});
exports.getSubCategoriesByCategoryId = getSubCategoriesByCategoryId;
const getSubCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const subCategory = yield prisma_1.default.subCategories.findUnique({
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
            next(new customClass_1.AppError("Sub Category not found", 404));
            return;
        }
        (0, successHandler_1.successHandler)(res, 200, "sub category fetched successfully", subCategory);
    }
    catch (error) {
        console.log(error);
        next(new customClass_1.AppError(`Internal Server Error`, 500));
    }
});
exports.getSubCategory = getSubCategory;
