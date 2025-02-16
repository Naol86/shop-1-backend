"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const generateAccessToken = (user) => {
    try {
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        console.log(user, accessTokenSecret);
        const payload = {
            email: user.email,
            id: user.id,
            profile_picture: user.profilePicture,
        };
        const token = jsonwebtoken_1.default.sign(payload, accessTokenSecret, { expiresIn: "1d" });
        console.log(token);
        return token;
    }
    catch (error) {
        return;
    }
};
exports.generateAccessToken = generateAccessToken;
