import { verifyToken } from "../utils/verifyToken.js";
import {
  updateUser,
  deleteUser,
  getUserCode,
  activateUser,
  getUserDetails,
} from "../controller/UserController.js";
import express from "express";

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser);
router.post("/getUser", getUserCode);
router.put("/ActivateAccount", activateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/getUser/:id", getUserDetails);

export default router;
