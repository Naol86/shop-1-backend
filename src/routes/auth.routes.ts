import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.controller";
import { setUploadDirectory, uploadImage } from "../middlewares/imageUploader";
import { validate } from "../middlewares/validator";
import {
  createUserSchema,
  loginUserSchema,
} from "../validators/user.validator";
import path from "path";

const router = Router();

router.post(
  "/signup",
  setUploadDirectory(path.join(__dirname, "../public/users")),
  uploadImage.single("image"),
  validate(createUserSchema),
  createUser
);

router.post("/signin", validate(loginUserSchema), loginUser);

export default router;
