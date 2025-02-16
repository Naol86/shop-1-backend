"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(50).required().messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters",
        "any.required": "Name is required",
    }),
    email: joi_1.default.string().email().required().messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required",
    }),
    password: joi_1.default.string().min(6).max(30).required().messages({
        "string.min": "Password must be at least 6 characters",
        "string.max": "Password cannot exceed 30 characters",
        "any.required": "Password is required",
    }),
});
exports.loginUserSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required",
    }),
    password: joi_1.default.string().min(6).max(30).required().messages({
        "string.min": "Password must be at least 6 characters",
        "string.max": "Password cannot exceed 30 characters",
        "any.required": "Password is required",
    }),
});
