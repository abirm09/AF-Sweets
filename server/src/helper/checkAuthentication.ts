import express from "express";
import { accessTokenSecret } from "../secret";
import jwt from "jsonwebtoken";
import { handleJWTErrors } from "./handleJWTErrors";
import User, { IUser } from "../model/userModel";
import { merge } from "lodash";
import { errorResponse } from "./responseHandler";
import { clearCookie } from "./clearCookie";
import deleteSessionToken from "./deleteSessionToken";

export const checkAuthentication = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authToken = req.cookies.__af_at;
    const sessionToken = req.cookies.st_af;

    // check tokens
    if (!authToken && sessionToken) {
      clearCookie(res, "st_af");
      clearCookie(res, "authenticated");
      await deleteSessionToken(sessionToken);
      return errorResponse(res, {
        message: "Unauthorized",
        statusCode: 401,
      });
    } else if (authToken && !sessionToken) {
      clearCookie(res, "__af_at");
      clearCookie(res, "authenticated");
      return errorResponse(res, {
        message: "Unauthorized",
        statusCode: 401,
      });
    } else if (!authToken && !sessionToken) {
      return errorResponse(res, {
        message: "Unauthorized",
        statusCode: 401,
      });
    }

    jwt.verify(
      authToken,
      `${accessTokenSecret}`,
      async (err: any, decoded: any) => {
        if (err) {
          // find the token and delete
          clearCookie(res, "__af_at");
          clearCookie(res, "st_af");
          clearCookie(res, "authenticated");
          await deleteSessionToken(sessionToken);
          return handleJWTErrors(res, err, next);
        }
        const user: IUser = await User.findOne({
          "authentication.token": sessionToken,
          _id: decoded.id,
        }).select({});

        // Handle if the user is banned or no user found. Sending "no user found" so that user think that the user has been deleted.
        if (!user || user.is_banned) {
          clearCookie(res, "__af_at");
          clearCookie(res, "st_af");
          clearCookie(res, "authenticated");
          return errorResponse(res, { message: "No user found." });
        }

        // handle if user logged in more than 3 device
        if ((user?.authentication?.length as number) >= 4) {
          return errorResponse(res, {
            message: "Device limit.",
            statusCode: 400,
          });
        }

        merge(req, { user });
        next();
      }
    );
  } catch (error: any) {
    return handleJWTErrors(res, error, next);
  }
};
