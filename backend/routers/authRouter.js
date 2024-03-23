import express from "express";
import {
  signUp,
  signIn,
  logOut,
  sendrecoverPassword,
  recoverPassword,
} from "../controller/authController.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.get("/logOut", logOut);
router.post("/sendRecoverPassword", sendrecoverPassword);
router.post("/recoverPassword", recoverPassword);

export default router;
