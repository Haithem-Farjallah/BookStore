import express from "express";
import {
  createComment,
  deleteComment,
  editComment,
  getComments,
  updateLikes,
} from "../controller/commentController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getComments/:id", getComments);
router.put("/likes", verifyToken, updateLikes);
router.put("/editComment", verifyToken, editComment);
router.delete("/deleteComment", verifyToken, deleteComment);

export default router;
