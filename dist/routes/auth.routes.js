"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const imageUploader_1 = require("../middlewares/imageUploader");
const validator_1 = require("../middlewares/validator");
const user_validator_1 = require("../validators/user.validator");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.post("/signup", (0, imageUploader_1.setUploadDirectory)(path_1.default.join(__dirname, "../public/users")), imageUploader_1.uploadImage.single("image"), (0, validator_1.validate)(user_validator_1.createUserSchema), user_controller_1.createUser);
router.post("/signin", (0, validator_1.validate)(user_validator_1.loginUserSchema), user_controller_1.loginUser);
exports.default = router;
