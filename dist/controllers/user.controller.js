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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.loginUser = exports.CreateUser = void 0;
const successHandler_1 = require("../utils/successHandler");
const customClass_1 = require("../utils/customClass");
const JWTToken_1 = require("../utils/JWTToken");
const prisma_1 = __importDefault(require("../config/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const CreateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const userExists = yield prisma_1.default.user.findUnique({ where: { email } });
    if (userExists) {
        const error = new customClass_1.AppError("User already exists", 409);
        next(error);
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield prisma_1.default.user.create({
        data: { name, email, password: hashedPassword },
    });
    if (user) {
        const { password } = user, newUser = __rest(user, ["password"]);
        (0, successHandler_1.successHandler)(res, 201, "user created", newUser);
        return;
    }
    const error = new Error("Error creating a new user please try again later");
    next(error);
});
exports.CreateUser = CreateUser;
exports.createUser = exports.CreateUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email, password);
    const user = yield prisma_1.default.user.findUnique({ where: { email } });
    console.log(user);
    if (!user) {
        const error = new customClass_1.AppError("User does not exist", 404);
        next(error);
        return;
    }
    if (user.password !== password) {
        const error = new customClass_1.AppError("Invalid email or password", 401);
        next(error);
        return;
    }
    const accessToken = (0, JWTToken_1.generateAccessToken)(user);
    if (!accessToken) {
        const error = new customClass_1.AppError("Please try again later", 500);
        next(error);
        return;
    }
    (0, successHandler_1.successHandler)(res, 200, "login successful", { user, accessToken });
});
exports.loginUser = loginUser;
