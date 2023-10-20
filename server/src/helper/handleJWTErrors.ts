import { Response, NextFunction } from "express";
import { errorResponse } from "./responseHandler";
export const handleJWTErrors = (
  res: Response,
  error: any,
  next: NextFunction
) => {
  if (error.message === "jwt expired") {
    return errorResponse(res, {
      message: "Your session is expired. Please login again.",
      statusCode: 401,
    });
  } else if (error.message === "invalid signature") {
    return errorResponse(res, {
      message: "Forbidden.",
      statusCode: 403,
    });
  } else if (error.message === "jwt must be provided") {
    return errorResponse(res, {
      message: "Forbidden.",
      statusCode: 403,
    });
  } else {
    return next(error);
  }
};
