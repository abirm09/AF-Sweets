import { Response } from "express";

interface responseTypes {
  message?: string;
  statusCode?: number;
  payload?: object;
}

export const successResponse = (res: Response, data: responseTypes) => {
  const { message = "Success", statusCode = 200, payload = undefined } = data;
  return res
    .status(statusCode)
    .send({ success: true, message, payload: payload });
};

export const errorResponse = (res: Response, data: responseTypes) => {
  const {
    message = "Internal server error. Please tray again later or contact support center.",
    statusCode = 500,
    payload = undefined,
  } = data;
  return res
    .status(statusCode)
    .send({ success: false, error: message, payload });
};
