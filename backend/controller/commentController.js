import Comment from "../Model/commentModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createComment = async (req, res, next) => {
  const { content, userId, bookId } = req.body;
  if (req.user.id !== userId) {
    return next(errorHandler(403, "You are not allowed to add comment ! "));
  }
  try {
    const newComment = await Comment.create({ content, userId, bookId });
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const data = await Comment.find({ bookId }).sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
