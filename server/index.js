import express from 'express';
import { createClient } from 'redis';
import env from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import recordRoute from './routes/recordRoute.js';
import transcriptRequestHandler from './handler/transcriptRequestHandler.js';

env.config();

(async function subscribeToTopic(topic) {
    const redisClient = createClient();
    await redisClient.connect();
    await redisClient.subscribe(topic, (message) => {
        try {
            const messageString = message.toString();
            const messageJson = JSON.parse(messageString);

            console.log(`Received message: ${messageString}`);

            transcriptRequestHandler.handleMessage(messageJson);
        } catch (e) { // emulates DLQ
            redisClient.publish(process.env.DLQ, message.toString());
        }
    }, true);
})(process.env.TOPIC);

(function startExpress(port) {
    const app = express();

    app.use(cors());
    app.use(fileUpload({ useTempFiles: true, tempFileDir: './tmp/' }));

    app.get('/', (req, res) => {
        res.send('UP');
    });

    app.use('/records', recordRoute);

    app.listen(port, () => {
        console.log(`Listening on port: ${port}`);
    });
})(process.env.PORT);
