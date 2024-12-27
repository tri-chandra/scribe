/**
 * This service emulates calling a library/API that converts voice to text
 */
import { Note } from '../store/consultationStore.js';

export default {
    generateTranscript: (consultation) => {
        return [
            new Note(consultation.timestamp, 'Lorem Ipsum'),
            new Note(consultation.timestamp + 5000, 'Lorem Ipsum'),
            new Note(consultation.timestamp + 10000, 'Lorem Ipsum')
        ];
    }
}