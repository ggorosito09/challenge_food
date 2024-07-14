import express from "express";
import foodTruckRouter from "./foodTruck.router.js";

const router = express.Router();

router.use("/api/foodtruck", foodTruckRouter);
// TODO: In case our app gets bigger, we can start dividing into different routers. 
// Now the base structure is setted.

export default router;