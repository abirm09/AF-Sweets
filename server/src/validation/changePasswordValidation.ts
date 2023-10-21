import { check } from "express-validator";
import validatePassword from "../helper/passwordValidator";

export const changePasswordValidation = [
  check("oldPassword")
    .notEmpty()
    .withMessage("Please provide your old password."),
  validatePassword("newPassword"),
];
