import express from "express";
import { signUp, signIn, logOut } from "../controller/authController.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.get("/logOut", logOut);

export default router;
