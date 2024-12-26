import express from 'express';

import consultationService from '../service/consultationService.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const file = req.files.file;
    const body = req.body;
    const note = JSON.parse(body.recordingNote);

    const consultation = await consultationService.recordConsultation(file, note);

    res.send(consultation);
});

router.get('/', (req, res) => {
    const consultations = consultationService.getConsultations();
    res.send(consultations)
});

router.get('/:id', (req, res) => {
    const consultation = consultationService.getConsultation(req.params.id);
    res.send(consultation)
});

export default router;