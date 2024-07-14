import FoodTruckService from '../services/foodTruck.service.js';
import errorHandler from '../errors/common.error.js';

export default class FoodTruckController {
    constructor() {
        this.foodTruckService = new FoodTruckService();

    }

    getData = async (req, res) => {
        try {
            const data = await this.foodTruckService.getData(req.query);
            res.json(data);
        } catch (error) {
            errorHandler(res, error);
        }
    }
}