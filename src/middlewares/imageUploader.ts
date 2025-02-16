import multer from "multer";
import path from "path";
import fs from "fs";
import { NextFunction, Request, Response } from "express";

// Extend Request Type to Include uploadDir
interface CustomRequest extends Request {
  uploadDir?: string;
}

// Middleware to dynamically set the upload directory
const setUploadDirectory =
  (uploadDir: string) =>
  (req: CustomRequest, res: Response, next: NextFunction) => {
    req.uploadDir = uploadDir;
    // console.log("Upload Directory Set:", uploadDir);
    next();
  };

const userStorage = multer.diskStorage({
  destination: (req: CustomRequest, file, cb) => {
    const uploadDir = req.uploadDir || path.join(__dirname, "../public/users"); // Default directory

    // console.log("Using Upload Directory:", uploadDir);

    // Ensure the directory exists (Synchronous)
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const userName = req.body?.name || "anonymous";
    cb(
      null,
      `${userName}-userImage-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const uploadImage = multer({
  storage: userStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

export { uploadImage, setUploadDirectory };
