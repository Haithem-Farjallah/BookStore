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

export const updateLikes = async (req, res, next) => {
  const { commentId, userId } = req.body;
  if (req.user.id !== userId) {
    return next(errorHandler(403, "You are not allowed to modify likes ! "));
  }
  try {
    const comment = await Comment.findOne({ _id: commentId });
    if (!comment) {
      return res.status.json({ message: "comment does not exist !" });
    }
    const didLike = comment.likes.indexOf(userId);
    if (didLike === -1) {
      comment.likes.push(userId);
      comment.numberOfLikes += 1;
    } else {
      comment.likes.splice(didLike, 1);
      comment.numberOfLikes -= 1;
    }
    comment.save();
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
};

export const editComment = async (req, res, next) => {
  const { commentId, content, userId } = req.body;
  if (req.user.id !== userId) {
    return next(errorHandler(403, "You are not allowed to modify comment ! "));
  }
  try {
    const updateComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        content,
      },
      { new: true }
    );
    res.status(200).json(updateComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  const { commentId, userId } = req.body;
  if (req.user.id !== userId) {
    return next(errorHandler(403, "You can only delete your comment ! "));
  }
  try {
    const del = await Comment.findByIdAndDelete(commentId);
    res.status(200).json(del);
  } catch (error) {
    next(error);
  }
};
