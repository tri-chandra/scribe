import { useState, useEffect, useRef } from 'react';

import { SERVER_URL } from '../config.js';

import { Comment } from '../models/Comment';
import { Recording } from '../models/Recording';

import './HomePage.css';
import Container from './Container';
import CommentSection from './CommentSection';

const Unicode = {
    record: '\u23FA',
    stop: '\u23F9',
    upload: '\u23CF'
}

const AUDIO_MIME_TYPE = 'audio/webm'

export default function HomePage() {
    const audioRecorder = useRef(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);;
    const [canRecord, setCanRecord] = useState(false);
    const [audioStream, setAudioStream] = useState(null);
    const [recording, setRecording] = useState(new Recording());
    const [patientName, setPatientName] = useState('');
    const [note, setNote] = useState('');
    const [comments, setComments] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        (async function checkPermission() {
            if ('MediaRecorder' in window) {
                try {
                    const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
                    setCanRecord(true);
                    setAudioStream(audioStream);
                } catch (err) {
                    setErrorMessage('Audio recording is not supported.');
                }
            } else {
                setErrorMessage('Audio recording is not supported.');
            }
        })();
    }, []);

    const addComment = (comment) => {
        if (comment && comment.trim().length > 0) {
            setComments([...comments, new Comment(comment)]);
        }
    }

    const startRecording = () => {
        const mediaRecorder = new MediaRecorder(audioStream, { type: AUDIO_MIME_TYPE });
        audioRecorder.current = mediaRecorder;
        audioRecorder.current.start();
        let localAudioChunks = [];
        audioRecorder.current.ondataavailable = (e) => {
            if (typeof e.data === 'undefined' || e.data.size === 0) return;
            localAudioChunks.push(e.data);
        }
        setAudioChunks(localAudioChunks);
    }

    const stopRecording = () => {
        audioRecorder.current.stop();
        audioRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: AUDIO_MIME_TYPE });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
        }
    }

    const uploadRecording = async () => {
        const data = new FormData();
        const audioFile = new File(audioChunks, 'audio.webm', { type: AUDIO_MIME_TYPE });
        data.append('file', audioFile);
        data.append('recordingNote', JSON.stringify({
            timestamp: recording.startTime,
            patientName: patientName,
            note: note,
            comments: comments
        }));
        await fetch(`${SERVER_URL}/records`, {
            method: 'POST',
            body: data
        });

        setAudioChunks([]);
    }

    const transitionReccording = async () => {
        switch (recording.status) {
            case 'init':
                setRecording({ ...recording, startTime: Date.now(), label: Unicode.stop, status: 'recording', canComment: true });
                startRecording();
                break;
            case 'recording':
                setRecording({ ...recording, label: Unicode.upload, status: 'recorded', canComment: true });
                stopRecording();
                break;
            case 'recorded':
                await uploadRecording();
                setRecording(new Recording());
                setNote('');
                setPatientName('');
                setComments([]);
                break;
        }
    }

    return (
        <div className="HomePageContainer">
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <Container>
                <button className="RecordingButton" disabled={!canRecord} onClick={transitionReccording}>{recording.label}</button>
                {recording.status === 'recorded' && <audio src={audio} controls />}
            </Container>
            <Container>
                <p><strong>Patient name:</strong></p>
                <input value={patientName} onChange={e => setPatientName(e.target.value)} />
            </Container>
            <Container>
                <p><strong>Notes:</strong></p>
                <textarea
                    rows="8" cols="50"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                />
            </Container>
            <CommentSection
                disabled={!recording.canComment}
                startTime={recording.startTime}
                comments={comments}
                onCommentAdded={addComment}
            />
        </div>
    );
}
