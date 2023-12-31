import express from "express";
import { IUser } from "../model/userModel";
import { get } from "lodash";
import { errorResponse } from "../helper/responseHandler";
export const isAdmin = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = get(req, "user") as unknown as IUser;
    if (user.role === "owner") {
      return next();
    }
    return errorResponse(res, { message: "Forbidden", statusCode: 403 });
  } catch (error) {
    next(error);
  }
};
