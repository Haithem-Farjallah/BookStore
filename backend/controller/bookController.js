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
