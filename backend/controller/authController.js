import User from "../Model/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { sendConfirmationMail } from "../utils/nodeMailer.js";

export const signUp = async (req, res, next) => {
  const { username, familyname, email, password, isStudent, remember } =
    req.body;
  try {
    const emailUser = await User.findOne({ email });
    if (!emailUser) {
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const newUser = await User.create({
        username,
        familyname,
        email,
        password: hashedPassword,
        isStudent,
        activationCode: 0,
      });
      const {
        password: pass,
        activationCode: active,
        ...result
      } = newUser._doc;
      res.status(200).json(result);
    } else {
      return next(errorHandler(401, "Email already in use"));
    }
  } catch (error) {
    res.json({ error });
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validMail = await User.findOne({ email });
    if (!validMail) {
      return next(errorHandler(403, "No account found with thie email"));
    }
    const hashedPassword = bcryptjs.compareSync(password, validMail.password);
    if (!hashedPassword) {
      return next(errorHandler(403, "invalid credentials"));
    }
    const min = 10000; // Minimum value for a 5-digit number
    const max = 99999; // Maximum value for a 5-digit number
    const generateCode = Math.floor(Math.random() * (max - min + 1)) + min;
    const token = jwt.sign({ id: validMail._id }, process.env.JWT_SECRET);
    await User.updateOne({ email }, { $set: { generateCode } });
    const {
      password: pass,
      activationCode: active,
      ...result
    } = validMail._doc;
    const twoDaysInSeconds = 2 * 24 * 60 * 60; //2 days before the end of cookie
    const expirationTime = new Date(Date.now() + twoDaysInSeconds * 1000);
    if (!result.isActive) {
      sendConfirmationMail(generateCode, result.email);
    }
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: expirationTime,
      })
      .status(200)
      .json(result);
  } catch (error) {
    next(error);
  }
};

export const logOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json({ message: "Logged Out" });
  } catch (error) {
    next(error);
  }
};
