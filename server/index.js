import express from 'express';
import { createClient } from 'redis';
import env from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import recordRoute from './routes/recordRoute.js';
import transcribeRequestHandler from './handler/transcribeRequestHandler.js';

env.config();

const redisClient = createClient();
await redisClient.connect();
const channelSubscription = redisClient.duplicate();
await channelSubscription.connect();
await channelSubscription.subscribe(process.env.TOPIC, (message) => {
    const messageString = message.toString();
    const messageJson = JSON.parse(messageString);

    console.log(`Received message: ${messageString}`);

    transcribeRequestHandler.handleMessage(messageJson);
}, true)

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(fileUpload({ useTempFiles: true, tempFileDir: './tmp/' }));

app.get('/', (req, res) => {
    res.send('UP');
});

app.use('/records', recordRoute);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});