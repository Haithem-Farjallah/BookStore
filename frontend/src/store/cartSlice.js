import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  totalItems: 0,
  totalPrice: 0,
};

const bookSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const bookDetails = action.payload;
      state.totalItems += bookDetails.number;
      state.totalPrice += bookDetails.totalPrice;
      if (!state.books.length) {
        state.books.push(bookDetails);
        return;
      }
      const existingBook = state.books.find(
        (book) => book.id === bookDetails.id
      );

      if (existingBook) {
        existingBook.number += bookDetails.number; // here we can use existingBook to modify Books array because objects are passed by reference
      } else {
        state.books.push(bookDetails);
      }
    },
    removeFromCart: (state, action) => {
      const { id, items, price } = action.payload;
      state.books = state.books.filter((book) => book.id !== id);
      state.totalItems -= items;
      state.totalPrice -= price;
    },
    clearCart: (state) => {
      state.books = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});
export const { addToCart, removeFromCart, clearCart } = bookSlice.actions;
export default bookSlice.reducer;
