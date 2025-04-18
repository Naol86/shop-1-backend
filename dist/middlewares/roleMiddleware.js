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
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleValidate = void 0;
const customClass_1 = require("../utils/customClass");
const roleValidate = (requiredRole) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // @ts-ignore
            const user = req.user;
            if (!user) {
                return next(new customClass_1.AppError("Unauthorized: No user found", 401));
            }
            // Check if the user has the required role
            if (user.role !== requiredRole) {
                return next(new customClass_1.AppError("Unauthorized: Insufficient permissions", 403));
            }
            next(); // User has the required role, proceed
        }
        catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
};
exports.roleValidate = roleValidate;
