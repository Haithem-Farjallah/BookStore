import express from "express";
import "dotenv/config";
import { connexion } from "./DB.js";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT;
connexion();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api/auth", authRouter);

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
