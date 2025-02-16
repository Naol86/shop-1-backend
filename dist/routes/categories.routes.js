"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controller_1 = require("../controllers/categories.controller");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const imageUploader_1 = require("../middlewares/imageUploader");
const path_1 = __importDefault(require("path"));
const category_validator_1 = require("../validators/category.validator");
const validator_1 = require("../middlewares/validator");
const router = (0, express_1.Router)();
router.get("/", categories_controller_1.getCategories);
router.post("/", authMiddleware_1.authenticate, (0, roleMiddleware_1.roleValidate)("ADMIN"), (0, imageUploader_1.setUploadDirectory)(path_1.default.join(__dirname, "../public/categories")), imageUploader_1.uploadImage.single("image"), (0, validator_1.validate)(category_validator_1.createCategorySchema), categories_controller_1.createCategory); // roleValidate("ADMIN"), authenticate
router.put("/:id", authMiddleware_1.authenticate, (0, roleMiddleware_1.roleValidate)("ADMIN"), categories_controller_1.updateCategory);
router.delete("/:id", authMiddleware_1.authenticate, (0, roleMiddleware_1.roleValidate)("ADMIN"), categories_controller_1.deleteCategory);
router.get("/:id", categories_controller_1.getCategory);
exports.default = router;
