import express from "express";
import UserRoutes from "./routes/user.routes";
import morgan from "morgan";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.get("/test", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.use("/api/users", UserRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
