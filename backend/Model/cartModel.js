import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
  userId: {
    type: String,
  },
  books: {
    type: Array,
    default: [],
  },
  totalItems: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
});
const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
