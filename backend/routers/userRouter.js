import { verifyToken } from "../utils/verifyToken.js";
import { updateUser, deleteUser } from "../controller/UserController.js";
import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
