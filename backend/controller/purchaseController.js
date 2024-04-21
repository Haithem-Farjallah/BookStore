import { PurchaseHistory } from "../Model/historyModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getPurchaseHistory = async (req, res, next) => {
  const userId = req.params.userId;
  if (userId !== req.user.id) {
    return next(errorHandler(401, "You can only see your accout purchases ! "));
  }
  try {
    const data = await PurchaseHistory.find({ userId }).sort({ createdAt: 1 });
    if (data.length === 0) {
      return next(errorHandler(200, "No data !"));
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
export const setPurchaseHistory = async (req, res, next) => {
  const data = req.body;
  if (data.userId !== req.user.id) {
    return next(
      errorHandler(401, "You can only purchase from your account ! ")
    );
  }
  try {
    await PurchaseHistory.create(data);

    res.status(200).json({ message: "done ! " });
  } catch (error) {
    next(error);
  }
};
