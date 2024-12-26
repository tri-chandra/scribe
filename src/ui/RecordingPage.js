import { useState, useEffect } from 'react';
import { SERVER_URL } from '../config.js';
import PatientCard from './PatientCard.js'

export default function RecordingPage() {
    const [consultations, setConsultations] = useState([]);
    const [selectedConsultationId, setSelectedConsultationId] = useState(null);
    const [consultation, setConsultation] = useState(null);

    const fetchConsultations = async () => {
        const response = await fetch(`${SERVER_URL}/records`);

        setConsultations(await response.json());
    }

    const fetchConsultation = async (id) => {
        if (id) {
            const response = await fetch(`${SERVER_URL}/records/${id}`);

            setConsultation(await response.json());
        }
    }

    useEffect(() => {
        fetchConsultations();
    }, []);

    useEffect(() => {
        fetchConsultation(selectedConsultationId);
    }, [selectedConsultationId]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('en-AU', { dateStyle: 'medium', timeStyle: 'medium' }).format(date);
    }

    return (
        <div>
            <ul>
                {consultations.map(record => (
                    <li key={record.id}>
                        <a href={`#${record.id}`} onClick={e => setSelectedConsultationId(record.id)}>{formatDate(record.timestamp)}</a>

                    </li>
                ))}
            </ul>
            {consultation && (
                <PatientCard record={consultation} />
            )}
        </div>
    );
}