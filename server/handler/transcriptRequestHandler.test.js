import transcriptRequestHandler from "./transcriptRequestHandler";
import consultationStore from '../store/consultationStore.js';
import transcriptService from '../service/transcriptService.js';

describe('handleMessage', () => {
    const mockConsultation = { foo: 'bar' };
    const mockTranscript = [1, 2, 3];
    consultationStore.getConsultation = jest.fn((id) => mockConsultation);
    transcriptService.generateTranscript = jest.fn((consultation) => mockTranscript);
    consultationStore.upsertConsultation = jest.fn((consultation) => consultation);

    const result = transcriptRequestHandler.handleMessage({ consultationId: 1 });

    test('fetching existing consultation', () => {
        expect(consultationStore.getConsultation).toHaveBeenCalledWith(1);
    });
    test('is generating transcript', () => {
        expect(transcriptService.generateTranscript).toHaveBeenCalledWith(mockConsultation);
    });
    test('update the consultation with transcript', () => {
        expect(result).toStrictEqual({ foo: 'bar', transcript: [1, 2, 3] });
    });
});
