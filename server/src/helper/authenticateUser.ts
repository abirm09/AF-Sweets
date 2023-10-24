import express from "express";
import jwt from "jsonwebtoken";
import { accessTokenSecret } from "../secret";
import User, { IUser } from "../model/userModel";
import { successResponse } from "./responseHandler";
import crypto from "crypto";
import { sendSecureCookie } from "./sendSecureCookie";
import { userInfo } from "./userPublicData";

const authenticateUser = async (
  req: any,
  res: express.Response,
  user: IUser,
  message: string = "Logged in successful."
) => {
  try {
    const maxDate = 20;
    // token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      `${accessTokenSecret}`,
      {
        expiresIn: maxDate + "d",
      }
    );
    const sessionToken = `${Date.now()}${crypto
      .randomBytes(32)
      .toString("base64")}${Math.floor(Math.random() * 900000 + 20000)}`;
    const doc = {
      $push: {
        authentication: {
          device: req.useragent.browser,
          os: req.useragent.os,
          token: sessionToken,
        },
      },
    };
    await User.findByIdAndUpdate(user._id, doc);
    // expiration date
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + maxDate);
    //send cookie
    // __af_at = Adi fakir access token
    sendSecureCookie(res, "__af_at", token, expirationDate);

    // st_af = session token adi fakir
    sendSecureCookie(res, "st_af", sessionToken, expirationDate);

    return successResponse(res, { message, payload: { user: userInfo(user) } });
  } catch (error) {
    throw error;
  }
};

export default authenticateUser;
