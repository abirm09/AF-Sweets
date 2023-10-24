import express from "express";
export const clearCookie = (res: express.Response, cookieName: string) => {
  return res.cookie(cookieName, "", { expires: new Date(0) });
};
