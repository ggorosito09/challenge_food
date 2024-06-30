import express from 'express';
import axios from 'axios';
import cors from 'cors'
const app = express();
const PORT = 3000;
const APP_URL_RAW = 'https://data.sfgov.org/resource/rqzj-sfat.json'
const APP_URL_GEO = 'https://data.sfgov.org/resource/rqzj-sfat.geojson'
const APP_TOKEN = "F3ChZibCo6q64PmptV4pkxfwE"

// Enabling CORS
app.use(cors());

app.get('/data', async (req, res) => {
    try {
        const response = await axios.get(APP_URL_GEO, {
            params: {
                $limit: 50,
                $$app_token: APP_TOKEN // TODO : Set ENV later.
            }
        });
        console.log("SERVER", { data: response.data })
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});