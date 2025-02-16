"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUploadDirectory = exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Middleware to dynamically set the upload directory
const setUploadDirectory = (uploadDir) => (req, res, next) => {
    req.uploadDir = uploadDir;
    // console.log("Upload Directory Set:", uploadDir);
    next();
};
exports.setUploadDirectory = setUploadDirectory;
const userStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = req.uploadDir || path_1.default.join(__dirname, "../public/users"); // Default directory
        // console.log("Using Upload Directory:", uploadDir);
        // Ensure the directory exists (Synchronous)
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        var _a;
        const userName = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.name) || "anonymous";
        cb(null, `${userName}-userImage-${Date.now()}${path_1.default.extname(file.originalname)}`);
    },
});
const uploadImage = (0, multer_1.default)({
    storage: userStorage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extName = fileTypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);
        if (extName && mimeType) {
            return cb(null, true);
        }
        else {
            cb(new Error("Only images are allowed"));
        }
    },
});
exports.uploadImage = uploadImage;
