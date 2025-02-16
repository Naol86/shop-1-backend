import { Router, Request, Response, NextFunction } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/categories.controller";
import { roleValidate } from "../middlewares/roleMiddleware";
import { authenticate } from "../middlewares/authMiddleware";
import { setUploadDirectory, uploadImage } from "../middlewares/imageUploader";
import path from "path";
import { createCategorySchema } from "../validators/category.validator";
import { validate } from "../middlewares/validator";

const router = Router();

router.get("/", getCategories);

router.post(
  "/",
  authenticate,
  roleValidate("ADMIN"),
  setUploadDirectory(path.join(__dirname, "../public/categories")),
  uploadImage.single("image"),
  validate(createCategorySchema),
  createCategory
); // roleValidate("ADMIN"), authenticate
router.put("/:id", authenticate, roleValidate("ADMIN"), updateCategory);
router.delete("/:id", authenticate, roleValidate("ADMIN"), deleteCategory);

router.get("/:id", getCategory);

export default router;
