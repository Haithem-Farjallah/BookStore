import Book from "../Model/bookModel.js";

export const getBooks = async (req, res, next) => {
  try {
    const data = await Book.find({});
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getSingleBook = async (req, res, next) => {
  try {
    const id = req.query.id;
    const data = await Book.findOne({ _id: id });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateQuantity = (req, res, next) => {
  try {
    req.body.map(async (item) => {
      const book = await Book.findOne({ _id: item.id });
      if (!book) {
        return next(errorHandler(403, "No book found !"));
      }
      const newQuantity = book.quantity - item.quantity;

      await Book.updateOne(
        { _id: item.id },
        { $set: { quantity: newQuantity } }
      );
    });

    res.status(200).json({ message: "Quantity updated successfully." });
  } catch (error) {
    next(error);
  }
};
