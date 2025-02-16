"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategorySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createCategorySchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(255).required().messages({
        "string.empty": "Category name is required.",
        "string.min": "Category name must be at least 3 characters.",
        "string.max": "Category name must not exceed 255 characters.",
    }),
    description: joi_1.default.string().min(5).max(1000).optional().messages({
        "string.min": "Description must be at least 5 characters.",
        "string.max": "Description must not exceed 1000 characters.",
    }),
    image: joi_1.default.string().uri().optional().messages({
        "string.uri": "Image must be a valid URL.",
    }),
});
