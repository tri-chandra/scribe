import CommentLineItem from './CommentLineItem.js'

export default function PatientCard({ record }) {
    return (
        <div>
            <div>Patient name: {record.patientName}</div>
            <div>Note: {record.note}</div>
            <div>Transcript:</div>
            {record.transcript.map(transcript => <CommentLineItem key={transcript.timestamp} comment={transcript} startTime={record.timestamp} />)}
            <div>Comments:</div>
            {record.comments.map(comment => <CommentLineItem key={comment.timestamp} comment={comment} startTime={record.timestamp} />)}
        </div>
    );
}