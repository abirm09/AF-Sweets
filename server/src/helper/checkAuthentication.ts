import express from "express";
import { accessTokenSecret } from "../secret";
import jwt from "jsonwebtoken";
import { handleJWTErrors } from "./handleJWTErrors";
import User, { IUser } from "../model/userModel";
import { merge } from "lodash";
import { errorResponse } from "./responseHandler";

export const checkAuthentication = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authToken = req.cookies.__af_s_at;
    const decoded: any = jwt.verify(authToken, `${accessTokenSecret}`);
    const user: IUser = await User.findOne({ _id: decoded.id }).select({});

    if (!user || user.is_banned) {
      res.cookie("__af_s_at", "", { expires: new Date(0) });
      return errorResponse(res, { message: "No user found." });
    }
    if (user.email !== decoded.email) {
      res.cookie("__af_s_at", "", { expires: new Date(0) });
      return errorResponse(res, {
        message: "Please login again.",
        statusCode: 401,
      });
    }
    merge(req, { user });
    next();
  } catch (error: any) {
    return handleJWTErrors(res, error, next);
  }
};
