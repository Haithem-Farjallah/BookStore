import mongoose from "mongoose";
import { boolean } from "webidl-conversions";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    familyname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isStudent: {
      type: Boolean,
    },
    profileImg: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    activationCode: {
      type: Number,
    },
    RecoverPass: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);
export default User;
