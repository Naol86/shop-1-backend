"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const categories_routes_1 = __importDefault(require("./routes/categories.routes"));
const sub_categories_routes_1 = __importDefault(require("./routes/sub-categories.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const notFound_1 = require("./middlewares/notFound");
const errorHandler_1 = require("./middlewares/errorHandler");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
// Serve static files correctly
const publicPath = path_1.default.join(__dirname, "../src/public");
app.use("/public", express_1.default.static(publicPath));
app.get("/", (req, res) => {
    res.json({ message: "hello world" });
});
app.get("/api/test", (req, res) => {
    res.send("Hello, TypeScript with Express!");
});
app.use("/api/users", user_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/category", categories_routes_1.default);
app.use("/api/sub-category", sub_categories_routes_1.default);
app.use("/api/products", product_routes_1.default);
app.use(notFound_1.notFound);
app.use(errorHandler_1.errorHandler);
exports.default = app;
