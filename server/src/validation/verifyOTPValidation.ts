import { check } from "express-validator";

export const verifyOTPValidation = [
  check("exp_time").isEmpty().withMessage("Only send requested data."),
];
