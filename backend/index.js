import express from 'express';
import cors from 'cors';
import router from './routes/router.js';
import config from './config/config.js';

const app = express();
//const httpServer = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", router);

app.get('/hola', async (req, res) => {
    res.status(200).send("hola");
});

app.listen(config.PORT, () => {
    console.info("Server connected.")
});

export default app;