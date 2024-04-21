import express from "express";
import {
  getPurchaseHistory,
  setPurchaseHistory,
} from "../controller/purchaseController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/setpurchaseHistory", verifyToken, setPurchaseHistory);
router.get("/getpurchaseHistory/:userId", verifyToken, getPurchaseHistory);

export default router;
