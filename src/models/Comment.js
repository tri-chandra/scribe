export default function Comment(content) {
    return {
        content,
        timestamp: Date.now()
    }
}