import express from "express";
import { addNewSweet } from "../controller/sweetsController";
const sweetsRoutes = express.Router();

/*============Add new sweet============*/
sweetsRoutes.post("/api/sweets/add-new-sweet", addNewSweet);

export default sweetsRoutes;
