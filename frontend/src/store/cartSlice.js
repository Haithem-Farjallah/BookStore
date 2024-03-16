import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  totalItems: 0,
  totlalPrice: 0,
};

const bookSlice = createSlice({
  name: Cart,
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const bookDetails = action.payload;
      const existingBook = state.books.find(
        (book) => book.id === bookDetails.id
      );

      if (existingBook) {
        existingBook.quantity += bookDetails.quantity; // here we can use existingBook to modify Books array because objects are passed by reference
      } else {
        state.books.push(bookDetails);
      }

      state.totalItems += bookDetails.quantity;
      state.talPrice += bookDetails.price;
    },
    clearCart: (state) => {
      state.books = [];
      state.totalItems = 0;
      state.talPrice = 0;
    },
  },
});
export default bookSlice.reducer;
