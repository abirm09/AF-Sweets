import { check } from "express-validator";
const validateLogin = [
  check("email")
    .notEmpty()
    .withMessage("Please provide a email.")
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password").notEmpty().withMessage("Please provide your password."),
];
export default validateLogin;
