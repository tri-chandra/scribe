import consultationService from "./consultationService";
import consultationStore, { Consultation } from '../store/consultationStore.js';
import fs from 'fs';
import { createClient } from 'redis';

jest.mock('redis', () => {
    const originalModule = jest.requireActual('redis');

    return {
        __esModule: true,
        ...originalModule,
        createClient: () => ({
            connect: jest.fn(),
            publish: jest.fn()
        })
    }
});

describe('consultationService', () => {
    describe('recordConsultation', () => {
        fs.rename = jest.fn();
        consultationStore.upsertConsultation = jest.fn(() => ({ id: 'foo' }))
        const mockAudioFile = { tempFilePath: 'foo' };
        const mockConsultation = new Consultation(
            'patient name',
            'note',
            [],
            Date.now()
        );
        consultationService.recordConsultation(mockAudioFile, mockConsultation);

        test('save the audio file', () => {
            expect(fs.rename).toHaveBeenCalledWith('foo', expect.stringMatching(/blob\/[a-z0-9-]+\.webm/), expect.anything());
        });
        test('save the consultation record', () => {
            expect(consultationStore.upsertConsultation).toHaveBeenCalledWith(expect.objectContaining({
                patientName: 'patient name',
                note: 'note'
            }));
        });
    });

    describe('getConsultation', () => {
        const mockConsultation = { foo: 'bar' };
        consultationStore.getConsultation = jest.fn((id) => mockConsultation);

        const result = consultationService.getConsultation(1);

        test('fetch the correct consultation', () => {
            expect(consultationStore.getConsultation).toHaveBeenCalledWith(1);
        });
        test('returns consultation', () => {
            expect(result).toStrictEqual(mockConsultation);
        });
    });

    describe('getConsultations', () => {
        const mockConsultations = [{ foo: 'bar' }];
        consultationStore.getConsultations = jest.fn((id) => mockConsultations);

        const result = consultationService.getConsultations();

        test('returns consultations', () => {
            expect(result).toStrictEqual(mockConsultations);
        });
    });
});