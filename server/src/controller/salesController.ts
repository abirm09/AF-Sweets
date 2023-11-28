import express from "express";
import { Sweet } from "../model/sweetModel";
import { errorResponse, successResponse } from "../helper/responseHandler";
import { Sales } from "../model/salesModel";
import settings from "../setting/settings.json";
import { get } from "lodash";
import { IUser } from "../model/userModel";

/*============Add sale============*/

export const addSale = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { customerName, sweetInfo, amount } = req.body;
    const user = get(req, "user") as unknown as IUser;
    const sweetsId = sweetInfo.map(
      (item: { sweet_id: string }) => item.sweet_id
    );
    const sweets = await Sweet.find({ _id: sweetsId });
    const amountFromServer = sweets.reduce((total, item) => {
      const item2 = sweetInfo.find(
        (sweet: { sweet_id: string }) => sweet.sweet_id === item._id.toString()
      );
      if (item && item2 && item.price_info && item.price_info.price) {
        return total + item2.unit * (item.price_info.price as number);
      }
      return total;
    }, 0);
    if (!amountFromServer || !amount) {
      throw Error("Fake request.");
    }
    if (
      amount <
      amountFromServer - (amountFromServer * settings.discount_price) / 100
    ) {
      return errorResponse(res, {
        message: `Amount must be greater than ${
          amountFromServer - (amountFromServer * 5) / 100
        }`,
      });
    }
    const newSale = new Sales({
      customer_name: customerName,
      sweet_info: sweetInfo,
      seller_id: user._id,
      net_price: amountFromServer,
      price: amount,
    });
    await newSale.save();
    return successResponse(res, { message: "Sale added successfully." });
  } catch (error) {
    next(error);
  }
};
