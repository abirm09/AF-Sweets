import express from "express";
import { clientSideHost } from "../secret";
export const sendSecureCookie = (
  res: express.Response,
  fieldName: string,
  value: string,
  expirationDate: Date
) => {
  return res.cookie(fieldName, value, {
    // domain: clientSideHost, // TODO: Uncomment before deploy.
    path: "/",
    httpOnly: true,
    sameSite: "none",
    secure: true,
    expires: expirationDate,
  });
};
