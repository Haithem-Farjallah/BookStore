import express from "express";
import { createComment, getComments } from "../controller/commentController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getComments/:id", getComments);

export default router;
