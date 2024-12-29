import './CommentLineItem.css';

export default function CommentLineItem({ comment, startTime }) {
    const durationInSeconds = Math.floor((comment.timestamp - startTime) / 1000);
    const duration = {
        hours: Math.floor(durationInSeconds / 3600),
        minutes: Math.floor((durationInSeconds % 3600) / 60),
        seconds: durationInSeconds % 60
    };

    return (
        <div className="CommentContainer">
            <span className="CommentContent">
                {new Intl.DurationFormat('en', { style: 'digital' }).format(duration)}
            </span>
            <span className="CommentContent">
                {comment.content}
            </span>
        </div>
    );
}