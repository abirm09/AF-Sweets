import express from "express";
import { errorResponse, successResponse } from "../helper/responseHandler";
import { Sweet } from "../model/sweetModel";
import { IUser } from "../model/userModel";
import { get } from "lodash";

/*============Add new sweet============*/
export const addNewSweet = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { name, image, price } = req.body;
    const user = get(req, "user") as unknown as IUser;
    const newSweets = new Sweet({
      name,
      image,
      price_info: {
        price,
        price_updates: [
          {
            price,
            user_id: user._id,
          },
        ],
      },
    });
    await newSweets.save();
    return successResponse(res, {
      message: "New sweet added successfully.",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

/*============Update sweet price============*/
export const updateSweetPrice = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { price, sweetId } = req.body;
    const user = get(req, "user") as unknown as IUser;
    const priceNum = parseInt(price);
    if (!price || isNaN(priceNum)) {
      return errorResponse(res, {
        message: "Please provide a valid price.",
        statusCode: 400,
      });
    }
    const doc: any = await Sweet.findOne({ _id: sweetId });
    if (doc) {
      doc.price_info.price = priceNum;
      doc.price_info.price_updates.push({
        price: priceNum,
        user_id: user._id,
      });
      await doc.save();
    }
    return successResponse(res, { message: "Price updated successfully." });
  } catch (error) {
    next(error);
  }
};

/*============Get sweet info============*/
export const allSweetInfo = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sweets = await Sweet.find({ is_alive: true }).select({
      name: 1,
      image: 1,
      "price_info.price": 1,
    });
    return successResponse(res, {
      message: "All sweets info.",
      payload: { sweets },
    });
  } catch (error) {
    next(error);
  }
};
