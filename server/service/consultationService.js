import fs from 'fs';
import env from 'dotenv';
import { createClient } from 'redis';
import consultationStore, { Consultation } from '../store/consultationStore.js';
import { TranscribeMessage } from '../dto/transcribeMessage.js'

env.config();
const redisClient = createClient();
await redisClient.connect();

const recordConsultation = async (audioFile, record) => {
    const savePath = `blob/${record.timestamp}.webm`;
    fs.rename(audioFile.tempFilePath, savePath, console.log);

    const consultation = consultationStore.upsertConsultation(new Consultation(
        record.timestamp,
        record.patientName,
        record.note,
        savePath,
        record.comments,
        record.timestamp
    ));

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