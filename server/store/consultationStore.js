const store = {};

export class Note {
    constructor(timestamp, content) {
        this.timestamp = timestamp;
        this.content = content;
    }
}

export class Consultation {
    constructor(id, patientName, note, audioPath, comments, timestamp) {
        this.id = id;
        this.patientName = patientName;
        this.note = note;
        this.audioPath = audioPath;
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

export default {
    getConsultation,
    upsertConsultation,
    getConsultations
}