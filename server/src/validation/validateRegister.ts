import { check } from "express-validator";
import validatePassword from "../helper/passwordValidator";
const validateRegister = [
  check("name").notEmpty().withMessage("Please provide your name."),
  check("email")
    .notEmpty()
    .withMessage("Please provide a email.")
    .isEmail()
    .withMessage("Please provide a valid email."),
  validatePassword("password"),
  check("role").isEmpty().withMessage("Only send requested data."),
  check("phone_number")
    .notEmpty()
    .withMessage("Please provide your phone number."),
  check("email_verified").isEmpty().withMessage("Only send requested data."),
  check("is_banned").isEmpty().withMessage("Only send requested data."),
];
export default validateRegister;
