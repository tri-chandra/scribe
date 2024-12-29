import CommentLineItem from './CommentLineItem.js';

import { SERVER_URL } from '../config.js';

export default function PatientCard({ record }) {
    return (
        <div>
            <audio src={`${SERVER_URL}/records/${record.id}/audio`} controls />
            <div><strong>Patient name:</strong> {record.patientName}</div>
            <div><strong>Note:</strong> {record.note}</div>
            <div><strong>Transcript:</strong></div>
            {record.transcript.map(transcript => <CommentLineItem key={transcript.timestamp} comment={transcript} startTime={record.timestamp} />)}
            <div><strong>Comments</strong>:</div>
            {record.comments.map(comment => <CommentLineItem key={comment.timestamp} comment={comment} startTime={record.timestamp} />)}
        </div>
    );
}