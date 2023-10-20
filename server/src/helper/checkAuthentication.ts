import express from "express";
import { successResponse } from "./responseHandler";
import { accessTokenSecret } from "../secret";
import jwt from "jsonwebtoken";
import { handleJWTErrors } from "./handleJWTErrors";
import User from "../model/userModel";
import { merge } from "lodash";

export const checkAuthentication = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authToken = req.cookies.__af_s_at;
    const decoded: any = jwt.verify(authToken, `${accessTokenSecret}`);
    const user = await User.findOne({ _id: decoded.id }).select({
      password: 0,
    });
    merge(req, { user });
    next();
  } catch (error: any) {
    return handleJWTErrors(res, error, next);
  }
};
