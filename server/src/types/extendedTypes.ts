import express from "express";
import { IUser } from "model/userModel";
export interface IExtendedReq extends express.Request {
  user: IUser;
}
