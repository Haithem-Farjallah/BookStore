import express from "express";
import { getBooks, getSingleBook } from "../controller/bookController.js";

const router = express.Router();

router.get("/getAllBooks", getBooks);
router.get("/getSingleBook", getSingleBook);

export default router;
