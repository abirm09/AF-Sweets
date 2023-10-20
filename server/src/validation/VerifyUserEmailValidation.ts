import { check } from "express-validator";
const VerifyUserEmailValidation = [
  check("otp").notEmpty().withMessage("Provide otp."),
];
export default VerifyUserEmailValidation;
