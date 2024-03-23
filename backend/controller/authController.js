import User from "../Model/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {
  sendConfirmationMail,
  sendVerificationPass,
} from "../utils/nodeMailer.js";
import cryptoRandomString from "crypto-random-string";

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
    await User.updateOne({ email }, { $set: { activationCode: generateCode } });
    const {
      RecoverPass: recover,
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

export const sendrecoverPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailExist = await User.findOne({ email });
    if (!emailExist) {
      return next(errorHandler(403, "No account found with this email !"));
    }
    let recoverCode = cryptoRandomString({ length: 10, type: "alphanumeric" }); // will generate a random alphanumeric string
    //or u can generate it manually like this :
    /*const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 25; i++) {
      recoverCode += Math.floor(Math.random() * characters[i]);
    } */
    sendVerificationPass(recoverCode, email);
    await User.updateOne({ email }, { $set: { RecoverPass: recoverCode } });
    res.status(200).send("Email sent successfully");
  } catch (error) {
    next(error);
  }
};

export const recoverPassword = async (req, res, next) => {
  const { RecoverPass, newPassword } = req.body;
  const validCode = await User.findOne({ RecoverPass });
  if (!validCode) {
    return next(errorHandler(403, "Unvalid Link ! "));
  }
  const hashedPassword = bcryptjs.hashSync(newPassword, 10);
  await User.updateOne({ RecoverPass }, { $set: { password: hashedPassword } });
  res.status(200).send("updated Successfully ! ");
};
