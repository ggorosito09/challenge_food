import express from 'express';
import { get } from 'axios';
const app = express();
const PORT = 3000;
const APP_URL = 'https://data.sfgov.org/resource/rqzj-sfat.json'
const APP_TOKEN = "F3ChZibCo6q64PmptV4pkxfwE"

app.get('/data', async (req, res) => {
    try {
        const response = await get(APP_URL, {
            params: {
                $limit: 5000,
                $$app_token: APP_TOKEN // TODO : Set ENV later.
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});