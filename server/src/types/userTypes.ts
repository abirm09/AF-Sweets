import express from "express";
export interface csRes extends express.Request {
  user: any;
}
