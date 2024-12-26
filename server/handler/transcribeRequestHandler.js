import consultationStore, { Note } from '../store/consultationStore.js';

const handleMessage = (message) => {
    const consultation = consultationStore.getConsultation(message.consultationId);
    const updatedConsultation = {
        ...consultation,
        transcript: [
            // todo: call a service/library
            new Note(consultation.timestamp, 'Lorem Ipsum'),
            new Note(consultation.timestamp + 5000, 'Lorem Ipsum'),
            new Note(consultation.timestamp + 10000, 'Lorem Ipsum')
        ]
    }

    consultationStore.upsertConsultation(updatedConsultation)
}

export default {
    handleMessage
}