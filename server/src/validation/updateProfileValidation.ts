import { check } from "express-validator";

export const updateProfileValidation = [
  check("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email."),
];
