import { checkAuthentication } from "../helper/checkAuthentication";
import { addSale } from "../controller/salesController";
import express from "express";
import { isOwnerOrStaff } from "../middleware/isOwnerOrStaff";

const salesRoute = express.Router();
salesRoute.use(checkAuthentication, isOwnerOrStaff);
/*============Add sale============*/
salesRoute.post("/api/sales/add-sales", addSale);
/**
 * /api/sales/add-sales
 * post:
 *      summary:Add sales.
 *      description:Add a new sale.
 *      @response :
 *         200:
 *          success:true,
 *          message:"Sale added successfully."
 * **/
export default salesRoute;
