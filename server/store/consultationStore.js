import crypto from 'node:crypto';

const store = {};

export class Note {
    constructor(timestamp, content) {
        this.timestamp = timestamp;
        this.content = content;
    }
}

export class Consultation {
    constructor(patientName, note, comments, timestamp) {
        this.id = crypto.randomUUID();
        this.clinicianId = 'dummy';
        this.patientName = patientName;
        this.note = note;
        this.audioPath = undefined;
        this.comments = comments;
        this.timestamp = timestamp;
        this.transcript = [];
    }
}

const getConsultation = (id) => {
    return store[id];
}

const upsertConsultation = (record) => {
    store[record.id] = record;

    return getConsultation(record.id);
}

const getConsultations = () => {
    return Object.values(store).sort((a, b) => { return a.id - b.id; });
}

export const clearAll = () => {
    for (const id in store) delete store[id];
}

export default {
    getConsultation,
    upsertConsultation,
    getConsultations
}