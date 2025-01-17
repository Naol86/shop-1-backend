import { Router } from "express";
import { validate } from "../middlewares/validator";
import {
  createUserSchema,
  loginUserSchema,
} from "../validators/user.validator";
import { createUser, loginUser } from "../controllers/user.controller";
import { uploadImage } from "../middlewares/imageUploader";

const router = Router();

router.post(
  "/",
  uploadImage.single("image"),
  validate(createUserSchema),
  createUser
);

router.post("/login", validate(loginUserSchema), loginUser);

export default router;
