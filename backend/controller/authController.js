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
  const { username, familyname, email, password } = req.body;
  try {
    const emailUser = await User.findOne({ email });
    if (!emailUser) {
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const newUser = await User.create({
        username,
        familyname,
        email,
        password: hashedPassword,
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
  const { email, password, remember } = req.body;
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
    if (!result.isActive) {
      sendConfirmationMail(generateCode, result.email);
    }
    let expirationTime = 0;
    if (remember) {
      const twoDaysInSeconds = 2 * 24 * 60 * 60; //2 days before the end of cookie
      expirationTime = new Date(Date.now() + twoDaysInSeconds * 1000);
    }
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        expires: expirationTime,
      })
      .status(200)
      .json(result);
  } catch (error) {
    next(error);
  }
};
export const signInGoogle = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      let generateCode = cryptoRandomString({ length: 5, type: "numeric" }); // will generate a random numeric number
      await User.updateOne(
        { email: req.body.email },
        { $set: { activationCode: generateCode } }
      );
      const {
        RecoverPass: recover,
        password: pass,
        activationCode: active,
        ...result
      } = user._doc;
      if (!result.isActive) {
        sendConfirmationMail(generateCode, result.email);
      }
      let expirationTime = 0;
      const twoDaysInSeconds = 2 * 24 * 60 * 60; //2 days before the end of cookie
      expirationTime = new Date(Date.now() + twoDaysInSeconds * 1000);

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          expires: expirationTime,
        })
        .status(200)
        .json(result);
    } else {
      const hashedPassword = bcryptjs.hashSync(
        cryptoRandomString({ length: 10, type: "alphanumeric" }),
        10
      );
      let generateCode = cryptoRandomString({ length: 5, type: "numeric" }); // will generate a random numeric number

      const newUser = await User.create({
        username: req.body.username,
        familyname: req.body.familyname,
        email: req.body.email,
        profileImg: req.body.profileImg,
        password: hashedPassword,
        activationCode: generateCode,
      });

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      let expirationTime = 0;
      const twoDaysInSeconds = 2 * 24 * 60 * 60; //2 days before the end of cookie
      expirationTime = new Date(Date.now() + twoDaysInSeconds * 1000);
      const {
        RecoverPass: recover,
        password: pass,
        activationCode: active,
        ...result
      } = newUser._doc;
      sendConfirmationMail(generateCode, result.email);

      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          expires: expirationTime,
        })
        .status(200)
        .json(result);
    }
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
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    next(error);
  }
};
export const verifyLink = async (req, res, next) => {
  const { RecoverPass } = req.body;
  const validCode = await User.findOne({ RecoverPass });
  if (!validCode) {
    return next(errorHandler(403, "Unvalid Link ! "));
  }
  res.status(200).json({ message: "You're good to go" });
};

export const recoverPassword = async (req, res, next) => {
  const { RecoverPass, newPassword } = req.body;
  const hashedPassword = bcryptjs.hashSync(newPassword, 10);
  await User.updateOne(
    { RecoverPass },
    { $set: { password: hashedPassword, RecoverPass: "" } }
  );
  res.status(200).json({ message: "updated Successfully ! " });
};
