import express from "express";
import jwt from "jsonwebtoken";
import { accessTokenSecret, clientSideHost } from "../secret";

const authenticateUser = (res: express.Response, user: any) => {
  const maxDate = 20;
  // token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    `${accessTokenSecret}`,
    {
      expiresIn: maxDate + "d",
    }
  );
  // expiration date
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + maxDate);

  // __af_s_at = Adi fakir access token
  //send cookie
  res.cookie("__af_s_at", token, {
    // domain: clientSideHost, // TODO: Uncomment before deploy.
    path: "/",
    httpOnly: true,
    sameSite: "none",
    secure: true,
    expires: expirationDate,
  });
};

export default authenticateUser;
