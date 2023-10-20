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
  check("email_verified").isEmpty().withMessage("Only send requested data."),
];
export default validateRegister;
