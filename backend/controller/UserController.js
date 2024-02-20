import User from "../Model/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcryptjs from "bcryptjs";
export const updateUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(errorHandler(401, "You can only update ur account ! "));
  }
  try {
    if (req.body.password) {
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          familyname: req.body.familyname,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
