import mongoose from "mongoose";

export const connexion = async () => {
  await mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("connected"))
    .catch((error) => console.log(error));
};
