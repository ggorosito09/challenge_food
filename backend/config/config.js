import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    APP_URL_RAW: process.env.APP_URL_RAW,
    APP_URL_GEO: process.env.APP_URL_GEO,
    APP_TOKEN: process.env.APP_TOKEN
};