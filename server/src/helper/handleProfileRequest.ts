import express from "express";
import { errorResponse } from "./responseHandler";

export const handleProfileRequest = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (!req.cookies.__af_s_at) {
      return errorResponse(res, {
        message: "Unauthenticated user.",
        statusCode: 400,
        payload: { user: null },
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
