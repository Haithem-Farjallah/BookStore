import mongoose from "mongoose";

const BookSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    textSnippest: {
      type: String,
    },
    description: {
      type: String,
    },
    author: {
      type: Array,
    },
    publisher: {
      type: String,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    pageCount: {
      type: Number,
    },
    image: {
      type: String,
    },
    category: {
      type: Array,
    },
    language: {
      type: String,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);
export default Book;
