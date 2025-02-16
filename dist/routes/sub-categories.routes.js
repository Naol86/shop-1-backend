"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sub_categories_controller_1 = require("../controllers/sub-categories.controller");
const imageUploader_1 = require("../middlewares/imageUploader");
const path_1 = __importDefault(require("path"));
const validator_1 = require("../middlewares/validator");
const sub_category_validator_1 = require("../validators/sub-category.validator");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.authenticate, (0, roleMiddleware_1.roleValidate)("ADMIN"), (0, imageUploader_1.setUploadDirectory)(path_1.default.join(__dirname, "../public/sub-categories")), imageUploader_1.uploadImage.single("image"), (0, validator_1.validate)(sub_category_validator_1.createSubCategorySchema), sub_categories_controller_1.createSubCategories);
router.get("/", sub_categories_controller_1.getSubCategories);
router.get("/category/:id", sub_categories_controller_1.getSubCategoriesByCategoryId);
router.get("/:id", sub_categories_controller_1.getSubCategories);
exports.default = router;
