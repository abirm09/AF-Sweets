import express from "express";
import { IUser } from "../model/userModel";
import { get } from "lodash";
import { errorResponse } from "../helper/responseHandler";
import { logoutUser } from "../helper/logoutUser";

export const isOwnerOrStaff = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = get(req, "user") as unknown as IUser;
    const token = get(req, "sessionToken") as unknown as string;
    if (user.role === "owner" || user.role === "staff") {
      return next();
    }
    logoutUser(token, res);
    return errorResponse(res, { message: "Forbidden", statusCode: 403 });
  } catch (error) {
    next(error);
  }
};
