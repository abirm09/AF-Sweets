import express from "express";
import validateRegister from "../validation/validateRegister";
import {
  login,
  logout,
  profile,
  registerUser,
  verifyEmailRequest,
  verifyUserEmail,
} from "../controller/userController";
import runValidation from "../validation/runValidation";
import { checkAuthentication } from "../helper/checkAuthentication";
import { handleProfileRequest } from "../helper/handleProfileRequest";
import VerifyUserEmailValidation from "../validation/VerifyUserEmailValidation";
import { limitFiveTimesInTenMin } from "../middleware/limitFiveTimesInTenMin";
import validateLogin from "../validation/loginValidation";
const userRouter: express.Router = express.Router();

/*============Register new user============*/
userRouter.post(
  "/api/user/register",
  limitFiveTimesInTenMin,
  validateRegister,
  runValidation,
  registerUser
);
/**
 * /api/user/register
 *  post:
 *      summary:Register.
 *      description:Register a new user.
 *      @body :
 *          name:User's full name,
 *          email:User's email address,
 *          password:User's password.
 *          profile_pic:Upload user profile picture,
 *      @response :
 *         201:
 *          success:true,
 *          message:"User created successfully."
 * **/

/*============Login a user============*/
userRouter.post(
  "/api/user/login",
  limitFiveTimesInTenMin,
  validateLogin,
  runValidation,
  login
);
/**
 * /api/user/login
 * post:
 *      summary:Login.
 *      description:Login a user.
 *      @body :
 *          email:User's email address,
 *          password:User's password.
 *      @response :
 *         200:
 *          success:true,
 *          message:"Logged in successfully."
 * **/

/*============Get user profile============*/
userRouter.get(
  "/api/user/profile",
  handleProfileRequest,
  checkAuthentication,
  profile
);
/**
 * /api/user/profile
 * get:
 *      summary:User profile.
 *      description:Get authenticated user profile data.
 *      @response :
 *        if user @is authenticated
 *        200:
 *        success:true,
 *        message:"User profile info."
 *        payload:{
 *            user:{
 *            "_id": "",
 *            "name": "",
 *            "email": "",
 *            "profile_pic": "",
 *            "role": "",
 *            "email_verified": boolean,
 *            "createdAt": "2023-10-18T03:58:05.592Z",
 *            "updatedAt": "2023-10-18T03:58:05.592Z",
 *            "__v": 0
 *             }
 *          }
 *
 *         if user is @not authenticated
 *         400:
 *         "success": false,
 *         "error": "Unauthenticated user.",
 *         "payload": {
 *              "user": null
 *          }
 *
 * **/

/*============Log out user============*/
userRouter.post("/api/user/logout", logout);
/**
 * /api/user/logout
 * post:
 *      summary:Logout.
 *      description:Logout user a user.
 *      @response :
 *         200:
 *          success:true,
 *          message:"Logged out user successfully."
 * **/

/*============Email verification request============*/
userRouter.post(
  "/api/user/verify-email-request",
  limitFiveTimesInTenMin,
  checkAuthentication,
  verifyEmailRequest
);
/**
 * /api/user/verify-email-request
 * post:
 *      summary:Email verify request.
 *      description:Request otp for verifying user email.
 *      @response :
 *         200:
 *          success:true,
 *          message:"Please check your inbox to verify your email."
 * **/

/*============Verify email============*/
userRouter.post(
  "/api/user/verify-email",
  limitFiveTimesInTenMin,
  VerifyUserEmailValidation,
  runValidation,
  checkAuthentication,
  verifyUserEmail
);
/**
 * /api/user/verify-email
 * post:
 *      summary:Email verify.
 *      description:Verify user email via otp.
 *      @response :
 *         200:
 *          success:true,
 *          message:"Email verified successfully."
 * **/

export default userRouter;
