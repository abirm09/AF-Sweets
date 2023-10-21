import express from "express";
import { errorResponse, successResponse } from "../helper/responseHandler";
import User, { IUser } from "../model/userModel";
import bcrypt from "bcryptjs";
import authenticateUser from "../helper/authenticateUser";
import { get, has } from "lodash";
import otpGenerator from "otp-generator";
import { VerifyEmailOtp } from "../model/verifyEmailOTPModel";
import { emailVerifyOtpEmail } from "../helper/emailVerifyOtpEmail";
import { IEmailData } from "../types/userTypes";
import { sendEmailWithNodeMailer } from "../helper/email";
import { userInfo } from "../helper/userPublicData";

/*============Register a new user============*/
// TODO: Make picture upload system
export const registerUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { name, email, password, phone_number } = req.body;
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
      phone_number,
    });
    const user = await newUser.save();
    //Create token and send cookie
    authenticateUser(res, user);
    return successResponse(res, {
      message: "User is created successfully.",
      statusCode: 201,
      payload: {
        user: userInfo(user),
      },
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
        message: "No user found.",
        statusCode: 404,
      });
    if (user.is_banned) {
      res.cookie("__af_s_at", "", { expires: new Date(0) });
      return errorResponse(res, {
        message: "No user found.",
        statusCode: 404,
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      authenticateUser(res, user);
      return successResponse(res, {
        message: "User logged in successfully.",
        payload: { user: userInfo(user) },
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
    try {
      const emailData: IEmailData = emailVerifyOtpEmail(user.email, otp);
      await sendEmailWithNodeMailer(emailData);
    } catch (error) {
      return errorResponse(res, {
        message: "Something went wrong please try again.",
      });
    }
    await VerifyEmailOtp.deleteMany({ requested_user_id: user._id });
    const otpData = new VerifyEmailOtp({
      otp,
      requested_user_id: user._id,
    });
    await otpData.save();
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
    if (user.email_verified) {
      return errorResponse(res, {
        message: "Your email is verified.",
        statusCode: 400,
      });
    }
    const otpRecord: any = await VerifyEmailOtp.findOne({
      requested_user_id: user._id,
      otp,
    });
    if (!otpRecord) {
      return errorResponse(res, {
        message: "OTP didn't match.",
        statusCode: 400,
      });
    }
    const currentTime = new Date();
    if (otpRecord.exp_time < currentTime) {
      await VerifyEmailOtp.findOneAndDelete({ _id: otpRecord._id });
      return errorResponse(res, {
        message: "OTP has been expired. Please request a new one.",
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

/*============Update user profile============*/
export const updateProfile = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { name, email, phone_number } = req.body;
    const user = get(req, "user") as unknown as IUser;
    user.email = email;
    const profile_picture = undefined;
    const updatedData = {
      name,
      email,
      phone_number,
      profile_picture,
      email_verified: email ? false : undefined,
    };
    await User.findByIdAndUpdate(user.id, updatedData);
    if (email) {
      authenticateUser(res, user);
    }
    return successResponse(res, {
      message: "Profile updated successfully.",
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

/*============Change password============*/
export const changePassword = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = get(req, "user") as unknown as IUser;
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      return errorResponse(res, {
        message: "Old password didn't match.",
        statusCode: 400,
      });
    }
    const hash = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, { password: hash });
    return successResponse(res, { message: "Password changed successfully." });
  } catch (error) {
    next(error);
  }
};
