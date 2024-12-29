import fs from 'fs';
import env from 'dotenv';
import { createClient } from 'redis';
import consultationStore, { Consultation } from '../store/consultationStore.js';
import { TranscribeMessage } from '../dto/transcribeMessage.js'

const redisClient = (function setupRedisClient() {
    env.config();
    const redisClient = createClient();
    redisClient.connect();

    return redisClient;
})();

const recordConsultation = async (audioFile, record) => {
    const newConsultation = new Consultation(
        record.patientName,
        record.note,
        record.comments,
        record.timestamp
    );
    const savePath = `blob/${newConsultation.id}.webm`;
    fs.rename(audioFile.tempFilePath, savePath, console.log);

    const consultation = consultationStore.upsertConsultation(newConsultation);

    await redisClient.publish(process.env.TOPIC, JSON.stringify(TranscribeMessage(consultation.id)));

    return consultation;
};

const getConsultations = () => {
    return consultationStore.getConsultations();
}

const getConsultation = (id) => {
    return consultationStore.getConsultation(id);
}

export default {
    recordConsultation,
    getConsultations,
    getConsultation
};