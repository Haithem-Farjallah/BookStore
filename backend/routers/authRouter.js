import express from "express";
import {
  signUp,
  signIn,
  signInGoogle,
  logOut,
  sendrecoverPassword,
  recoverPassword,
  verifyLink,
} from "../controller/authController.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/google", signInGoogle);
router.get("/logOut", logOut);
router.post("/sendRecoverPassword", sendrecoverPassword);
router.post("/recoverPassword", recoverPassword);
router.post("/verifyLink", verifyLink);

export default router;
