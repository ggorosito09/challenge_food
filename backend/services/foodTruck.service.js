import axios from 'axios';
import config from '../config/config.js';
import NodeCache from 'node-cache';

export default class FoodTruckService {
    constructor() {
        this.cache = new NodeCache({ stdTTL: 600 });
    }

    getData = async (query) => {
        const cacheKey = JSON.stringify(query);
        const cachedData = this.cache.get(cacheKey);

        if (cachedData) {
            return cachedData;
        }

        const { $limit, $offset, $q } = query;

        // TODO: Inject this as part of the ctor.
        const response = await axios.get(config.APP_URL_GEO, {
            params: {
                $limit,
                $offset,
                $q,
                $$app_token: config.APP_TOKEN
            }
        });

        /**
         * The API returns a lot of data
         * - With/without coordinates.
         * - Some of them without even "fooditems"
         * - Many of them are not "APPROVED"
         * 
         * So here it is hardcoded a post processing of the items.
         * We could manipulate this through the API SoQL
         */
        // TODO: DTO.
        const filteredData = response.data.features.filter(
            (truckFeature) => truckFeature.properties &&
                truckFeature.properties.applicant &&
                truckFeature.properties.fooditems &&
                truckFeature.properties.latitude &&
                truckFeature.properties.latitude !== '0' &&
                truckFeature.properties.longitude &&
                truckFeature.properties.longitude !== '0' &&
                truckFeature.properties.status &&
                truckFeature.properties.status === 'APPROVED' &&
                truckFeature.properties.approved &&
                new Date(truckFeature.properties.approved).getFullYear() >= 2020
        );

        this.cache.set(cacheKey, filteredData);

        return filteredData;
    }
}
