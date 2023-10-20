import { check } from "express-validator";
const validatePassword = (name: string) => {
  return check(name)
    .notEmpty()
    .withMessage("Please provide a password.")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[@#$%*?])(?=.*\d).{8,}$/)
    .withMessage(
      "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one special character (@, #, $, %, *, ?), and one number."
    );
};
export default validatePassword;
