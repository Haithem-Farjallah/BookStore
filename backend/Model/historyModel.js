import mongoose from "mongoose";

const purchaseHistorySchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    books: {
      type: Array,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    streetAdress: {
      type: String,
      required: true,
    },
    ZipCode: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
export const PurchaseHistory = mongoose.model(
  "purchaseHistory",
  purchaseHistorySchema
);
