import { verifyToken } from "../utils/verifyToken.js";
import {
  updateUser,
  deleteUser,
  getUser,
  activateUser,
} from "../controller/UserController.js";
import express from "express";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.post("/getUser", getUser);
router.put("/ActivateAccount", activateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
