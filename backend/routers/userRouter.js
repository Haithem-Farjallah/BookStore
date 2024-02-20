import { verifyToken } from "../utils/verifyToken.js";
import { updateUser } from "../controller/UserController.js";
import express from "express";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);

export default router;
