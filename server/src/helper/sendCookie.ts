import express from "express";
import { clientSideHost } from "../secret";
export const sendCookie = (
  res: express.Response,
  fieldName: string,
  value: string,
  expirationDate: Date,
  httpOnly: boolean = true,
  secure: boolean = true
) => {
  return res.cookie(fieldName, value, {
    domain: clientSideHost,
    path: "/",
    httpOnly,
    sameSite: "none",
    secure,
    expires: expirationDate,
  });
};
