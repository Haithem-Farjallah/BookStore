import express from "express";
import {
  getCartBooks,
  addBookToCart,
  removeBookFromCart,
  removeAllFromCart,
  getBooksAfterLogin,
  UpdateBooksAfterLogin,
} from "../controller/CartController.js";

const router = express.Router();

router.get("/getCartBooks", getCartBooks);
router.post("/addBookToCart", addBookToCart);
router.delete("/removeBookFromCart", removeBookFromCart);
router.delete("/removeAllFromCart", removeAllFromCart);
router.post("/getBooksAfterLogin", getBooksAfterLogin);
router.post("/UpdateBooksAfterLogin", UpdateBooksAfterLogin);
export default router;
