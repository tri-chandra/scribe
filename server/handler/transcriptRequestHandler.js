import consultationStore from '../store/consultationStore.js';
import transcriptService from '../service/transcriptService.js';

const handleMessage = (message) => {
    const consultation = consultationStore.getConsultation(message.consultationId);
    const transcript = transcriptService.generateTranscript(consultation);
    const updatedConsultation = {
        ...consultation,
        transcript
    };

    return consultationStore.upsertConsultation(updatedConsultation);
}

export default {
    handleMessage
}