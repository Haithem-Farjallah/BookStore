import express from "express";
import "dotenv/config";
import { connexion } from "./DB.js";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import bookRouter from "./routers/bookRouter.js";
import cartRouter from "./routers/CartRouter.js";
import commentRouter from "./routers/commentRouter.js";
import cookieParser from "cookie-parser";
import Book from "./Model/bookModel.js";
import path from "path";
const PORT = process.env.PORT;
connexion();

const __dirname = path.resolve();
const app = express();
app.use(express.static(path.join(__dirname, "/frontend/public")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "public", "index.html"));
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://BookStore-app.onrender.com"],
  })
);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);
app.use("/api/cart", cartRouter);
app.use("/api/comment", commentRouter);

app.listen(PORT, () => console.log("app is listening on port " + PORT));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error !";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.post("/addbook", async (req, res) => {
  try {
    const data = await Book.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});
