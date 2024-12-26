import { useState } from 'react';

import Container from './Container';
import CommentLineItem from './CommentLineItem';

export default function CommentSection({ disabled, startTime, comments, onCommentAdded }) {
    const [comment, setComment] = useState('');

    const addComment = (comment) => {
        onCommentAdded(comment);
        setComment('');
    }

    return (
        <>
            <Container>
                <p>Additional comments</p>
                <textarea
                    rows="8" cols="50"
                    disabled={disabled}
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
            </Container>
            <Container>
                <button disabled={disabled} onClick={() => addComment(comment)}>Add comment</button>
            </Container>
            <Container>
                {comments.map(comment => <CommentLineItem key={comment.timestamp} comment={comment} startTime={startTime} />)}
            </Container>
        </>
    );
}