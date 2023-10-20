import express from "express";
import { validationResult } from "express-validator";

const runValidation = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const messages = result.array().map(item => item.msg);
    return res.status(400).send({ success: false, error: messages });
  }
  next();
};
export default runValidation;
