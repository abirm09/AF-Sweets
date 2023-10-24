import express from "express";
import { successResponse } from "../helper/responseHandler";
import { Sweet } from "../model/sweetModel";

export const addNewSweet = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const {} = req.body;
    const newSweets = new Sweet({
      name: "Sweet 1",
      image: "Image link",
      price_info: {
        price: 200,
        price_updates: [
          {
            user_id: "653358ba94a0d360c6c36bd1",
          },
        ],
      },
    });
    await newSweets.save();
    return successResponse(res, { message: "New sweet added successfully." });
  } catch (error) {
    next(error);
  }
};
