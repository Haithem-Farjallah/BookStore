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
        existingBook.totalPrice += bookDetails.totalPrice;
      } else {
        state.books.push(bookDetails);
      }
    },
    clearCart: (state) => {
      state.books = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});
export const { addToCart, clearCart } = bookSlice.actions;
export default bookSlice.reducer;
