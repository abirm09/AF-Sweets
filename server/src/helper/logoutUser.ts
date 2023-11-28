import { Response } from "express";
import { clearCookie } from "./clearCookie";
import deleteSessionToken from "./deleteSessionToken";

export const logoutUser = async (token: string, res: Response) => {
  try {
    clearCookie(res, "__af_at");
    clearCookie(res, "st_af");
    clearCookie(res, "authenticated");
    await deleteSessionToken(token);
  } catch (error) {}
};
