import { Router } from "express";
import {
  createSubCategories,
  getSubCategories,
  getSubCategoriesByCategoryId,
} from "../controllers/sub-categories.controller";
import { setUploadDirectory, uploadImage } from "../middlewares/imageUploader";
import path from "path";
import { validate } from "../middlewares/validator";
import { createSubCategorySchema } from "../validators/sub-category.validator";
import { authenticate } from "../middlewares/authMiddleware";
import { roleValidate } from "../middlewares/roleMiddleware";

const router = Router();

router.post(
  "/",
  authenticate,
  roleValidate("ADMIN"),
  setUploadDirectory(path.join(__dirname, "../public/sub-categories")),
  uploadImage.single("image"),
  validate(createSubCategorySchema),
  createSubCategories
);
router.get("/", getSubCategories);
router.get("/category/:id", getSubCategoriesByCategoryId);
router.get("/:id", getSubCategories);
export default router;
