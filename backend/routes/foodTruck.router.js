import express from 'express';
import FoodTruckController from '../controllers/foodTruck.controller.js';

const foodTruckRouter = express.Router();
const foodTruckController = new FoodTruckController();

foodTruckRouter.get('/data', foodTruckController.getData);

export default foodTruckRouter;