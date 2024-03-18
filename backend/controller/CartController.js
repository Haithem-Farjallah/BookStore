import Cart from "../Model/cartModel.js";

export const getCartBooks = async (req, res, next) => {
  try {
    const data = await Cart.findOne({ userId: req.id });
    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

export const addBookToCart = async (req, res, next) => {
  try {
    const existingUser = await Cart.findOne({ userId: req.body.userId });

    if (existingUser) {
      const existingBook = existingUser.books.find(
        (book) => book.id === req.body.id
      );
      if (existingBook) {
        existingBook.number += req.body.number;
        existingBook.totalPrice += req.body.totalPrice;
      } else {
        //const data = { id: req.body.bookId, title: req.body.title, url: req.body.url };
        const { userId, ...data } = req.body;
        existingUser.books.push(data);
      }
      existingUser.totalItems += req.body.number;
      existingUser.totalPrice += req.body.totalPrice;
      await Cart.updateOne({ userId: req.body.userId }, { $set: existingUser });
      res.status(200).json(existingUser);
    } else {
      const { userId, totalItems, number, totalPrice, ...data } = req.body;
      const newBookInCart = await Cart.create({
        userId,
        books: [{ ...data, number, totalPrice }],
        totalItems: number,
        totalPrice,
      });
      res.status(200).json(newBookInCart._doc);
    }
  } catch (error) {
    next(error);
  }
};

export const removeBookFromCart = async (req, res, next) => {
  try {
    const { userId, id, items, price } = req.body;
    const existingUser = await Cart.findOne({ userId });
    existingUser.books = existingUser.books.filter((book) => book.id !== id);
    existingUser.totalItems -= items;
    existingUser.totalPrice -= price;
    await Cart.updateOne({ userId: req.body.userId }, { $set: existingUser });
    res.status(200).json(existingUser);
  } catch (error) {
    next(error);
  }
};

export const removeAllFromCart = async (req, res, next) => {
  try {
    const del = await Cart.deleteOne({ userId: req.body.userId });
    res.status(200).json(del);
  } catch (error) {
    next(error);
  }
};

export const getBooksAfterLogin = async (req, res, next) => {
  try {
    const data = await Cart.findOne({ userId: req.body.userId });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const UpdateBooksAfterLogin = async (req, res, next) => {
  try {
    const { userId, ...items } = req.body;
    const data = await Cart.findOne({ userId });
    if (!data) return;
    const result = await Cart.updateOne({ userId }, { $set: items });
    res.status(200).json("done");
  } catch (error) {
    next(error);
  }
};
