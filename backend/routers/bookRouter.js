import express from "express";
import {
  getBooks,
  getSingleBook,
  updateQuantity,
} from "../controller/bookController.js";

const router = express.Router();

router.get("/getAllBooks", getBooks);
router.get("/getSingleBook", getSingleBook);
router.put("/updateQuantity", updateQuantity);

export default router;
