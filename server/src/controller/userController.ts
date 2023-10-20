import express from "express";
import { errorResponse, successResponse } from "../helper/responseHandler";
import User, { IUser } from "../model/userModel";
import bcrypt from "bcryptjs";
import authenticateUser from "../helper/authenticateUser";
import { get } from "lodash";
import otpGenerator from "otp-generator";
import { VerifyEmailOtp } from "../model/verifyEmailOTPModel";

/*============Register a new user============*/
// TODO: Make picture upload system
export const registerUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const isAlreadyExist = await User.findOne({ email });
    if (isAlreadyExist)
      return errorResponse(res, {
        message: "This email is already taken.",
        statusCode: 409,
      });
    // Create password hash
    const hash = await bcrypt.hash(password, 10);
    // create new user
    const newUser = new User({
      name,
      email,
      password: hash,
      email_verified: false,
      profile_pic: null, //TODO: change with actual url.
      role: "user",
    });
    const user = await newUser.save();
    //Create token and send cookie
    authenticateUser(res, user);
    return successResponse(res, {
      message: "User is created successfully.",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

/*============Login user============*/
export const login = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return errorResponse(res, {
        message: "No user found with this email.",
        statusCode: 404,
      });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      authenticateUser(res, user);
      return successResponse(res, {
        message: "User logged in successfully.",
      });
    } else {
      return errorResponse(res, {
        message: "Password did not match.",
        statusCode: 401,
      });
    }
  } catch (error) {
    next(error);
  }
};

/*============Authenticated user profile============*/
export const profile = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = get(req, "user") as unknown as IUser;
    return successResponse(res, {
      message: "User profile info.",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

/*============Logout user============*/
export const logout = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    res.cookie("__af_s_at", "", { expires: new Date(0) });
    return successResponse(res, { message: "Logged out user successfully." });
  } catch (error) {
    next(error);
  }
};

/*============Verify email request============*/
export const verifyEmailRequest = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = get(req, "user") as unknown as IUser;
    if (user.email_verified) {
      return errorResponse(res, {
        message: "Your email is already verified.",
        statusCode: 400,
      });
    }
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: true,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    await VerifyEmailOtp.deleteMany({ requested_user_id: user._id });
    const otpData = new VerifyEmailOtp({
      otp,
      requested_user_id: user._id,
    });
    await otpData.save();
    console.log(otp);
    return successResponse(res, {
      message: "Please check your inbox to verify your email.",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

/*============Verify user email============*/
export const verifyUserEmail = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { otp } = req.query;
    const user = get(req, "user") as unknown as IUser;
    const otpRecord: any = await VerifyEmailOtp.findOne({
      requested_user_id: user._id,
      otp,
    });
    if (!otpRecord) {
      return errorResponse(res, {
        message: "otp didn't match.",
        statusCode: 400,
      });
    }
    const currentTime = new Date();
    if (otpRecord.exp_time < currentTime) {
      await VerifyEmailOtp.findOneAndDelete({ _id: otpRecord._id });
      return errorResponse(res, {
        message: "opt has been expired. Please request a new otp.",
        statusCode: 400,
      });
    }
    await VerifyEmailOtp.findOneAndDelete({ _id: otpRecord._id });
    await User.findOneAndUpdate({ _id: user._id }, { email_verified: true });
    return successResponse(res, {
      message: "Email verified successfully.",
    });
  } catch (error) {
    next(error);
  }
};
