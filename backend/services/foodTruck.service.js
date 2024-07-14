import axios from 'axios';
import config from '../config/config.js';

export default class FoodTruckService {
    constructor() {
        // TODO: Support later Caching.
    }

    async getData(query) {

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


        return filteredData;
    }
}
