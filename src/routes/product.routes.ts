import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import path from "path";
import { validate } from "../middlewares/validator";
import {
  createProduct,
  getProduct,
  getProducts,
  getProductsByCategory,
  getProductsBySubCategory,
} from "../controllers/products.controller";
import { uploadImages } from "../middlewares/imagesUploader";
import { roleValidate } from "../middlewares/roleMiddleware";

const router = Router();

router.get("/", getProducts);
router.post(
  "/",
  authenticate,
  roleValidate("ADMIN"),
  uploadImages.array("images", 5),
  createProduct
);

router.get("/:id", getProduct);
router.get("/category/:id", getProductsByCategory);
router.get("/sub-category/:id", getProductsBySubCategory);

export default router;
