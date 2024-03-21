import User from "../Model/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(errorHandler(401, "You can only update ur account ! "));
  }
  try {
    const updateFields = {};
    if (req.body.username) updateFields.username = req.body.username;
    if (req.body.familyname) updateFields.familyname = req.body.familyname;
    if (req.body.email) updateFields.email = req.body.email;
    if (req.body.file) updateFields.profileImg = req.body.file;
    if (req.body.password) {
      updateFields.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if (updateFields.email) {
      //if user inserted an already usable email
      const existingUserWithEmail = await User.findOne({
        email: updateFields.email,
      });
      if (
        existingUserWithEmail &&
        existingUserWithEmail._id.toString() !== req.params.id
      ) {
        return next(errorHandler(400, "This Email is  already in use !"));
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: updateFields,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(403, "You can only delete your account ! "));
  }
  try {
    const del = await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token").status(200).json(del);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const data = await User.findOne({ email });
    const { activationCode: active, ...result } = data._doc;
    res.status(200).json(active);
  } catch (error) {
    next(error);
  }
};

export const activateUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    const data = await User.findByIdAndUpdate(
      id,
      {
        $set: { isActive: true, activationCode: 0 },
      },
      { new: true }
    );
    const { password: pass, activationCode: active, ...result } = data._doc;
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
