import express from 'express';
import axios from 'axios';
import cors from 'cors'
import config from '../config/config.js';

const app = express();
// TODO: It would be good to have a way to shift between the outputs.

// Enabling CORS
app.use(cors());

// TODO: This should get separated in a particular router, then we can add middlewares for authentication, error, logging, etc.
app.get('/data', async (req, res) => {
    try {

        const {
            $limit,
            $offset,
            // By the time, this is the only paramter we receive from FE
            $q
        } = req.query

        const response = await axios.get(config.APP_URL_GEO, {
            params: {
                $limit,
                $offset,
                $q,
                $$app_token: config.APP_TOKEN // TODO : Set ENV later.
            }
        })

        /**
         * The API returns a lot of data
         * - With/without coordinates.
         * - Some of them without even "fooditems"
         * - Many of them are not "APPROVED"
         * 
         * So here it is hardcoded a post processing of the items.
         * We could manipulate this through the API SoQL
         */
        response.data.features = response.data.features.filter(
            (truckFeature) => {
                return truckFeature.properties &&
                    truckFeature.properties.applicant &&
                    truckFeature.properties.fooditems &&
                    truckFeature.properties.latitude &&
                    truckFeature.properties.latitude !== '0' &&
                    truckFeature.properties.longitude &&
                    truckFeature.properties.longitude !== '0' &&
                    // approved recently
                    truckFeature.properties.status &&
                    truckFeature.properties.status === 'APPROVED' &&
                    truckFeature.properties.approved &&
                    new Date(truckFeature.properties.approved).getFullYear() >= 2020
            }

        );
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
});