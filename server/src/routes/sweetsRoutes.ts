import express from "express";
import {
  addNewSweet,
  allSweetInfo,
  updateSweetPrice,
} from "../controller/sweetsController";
import { checkAuthentication } from "../helper/checkAuthentication";
import { isAdmin } from "../middleware/isAdmin";
import { isOwnerOrStaff } from "../middleware/isOwnerOrStaff";
const sweetsRoutes = express.Router();

/*============Add new sweet============*/
sweetsRoutes.post(
  "/api/sweets/add-new-sweet",
  checkAuthentication,
  isAdmin,
  addNewSweet
);
/**
 * /api/sweets/add-new-sweet
 * post:
 *      summary:Add new sweet.
 *      description:Add new sweets to sweets collection..
 *      @response :
 *         201:
 *          success:true,
 *          message:"New sweet added successfully."
 * **/

/*============Update sweet price============*/
sweetsRoutes.put(
  "/api/sweets/update-sweet-price",
  checkAuthentication,
  isOwnerOrStaff,
  updateSweetPrice
);
/**
 * /api/sweets/update-sweet-price
 * post:
 *      summary:Update price.
 *      description:Update sweets price.
 *      @response :
 *         200:
 *          success:true,
 *          message:"Price updated successfully."
 * **/

/*============Get sweet info============*/
sweetsRoutes.get("/api/sweets/all-sweets-info", allSweetInfo);
/**
 * /api/sweets/all-sweets-info
 * post:
 *      summary:All sweets info.
 *      description:Get all sweets information.
 *      @response :
 *         200:
 *          success:true,
 *          message:"All sweets info."
 *          payload:{
 *          _id:""
 *          name:""
 *          image:""
 *          price_info:{
 *             price:1
 *            }
 *          }
 * **/

export default sweetsRoutes;
