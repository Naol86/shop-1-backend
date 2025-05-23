"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const products_controller_1 = require("../controllers/products.controller");
const imagesUploader_1 = require("../middlewares/imagesUploader");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
router.get("/", products_controller_1.getProducts);
router.post("/", authMiddleware_1.authenticate, (0, roleMiddleware_1.roleValidate)("ADMIN"), imagesUploader_1.uploadImages.array("images", 5), products_controller_1.createProduct);
router.get("/:id", products_controller_1.getProduct);
router.get("/category/:id", products_controller_1.getProductsByCategory);
router.get("/sub-category/:id", products_controller_1.getProductsBySubCategory);
exports.default = router;
