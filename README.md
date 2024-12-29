# Scribe App

## Spec

- nodejs v18

## How to run

### Frontend

Run app:
```
npm install
npm start
```

### Backend

Run redis:
```
docker run -p 6379:6379 -it redis/redis-stack-server:latest
```

Run express server:
```
cd server
npm start
```

Run tests:
```
cd server
npm test
```

## Design

### Creating consultation record

![Saving consultation record](doc/scribe-flow.svg)

### Fetching saved consultation records

![Fetching consultation record](doc/scribe-flow-2.svg)

### Notes
- Frontend and backend communicates via REST API.
- Synchronous flow to store recorded audio file and consultation notes.
- [Simulated] Either a separate service/library would handle the conversion from audio -> text.
    - This is represented by a "wrapper" `transcriptService.js`.
    - Audio -> text conversion is done asynchronously via a queue (this is simmulated using redis pubsub).
    - There is no DLQ for redis pubsub, so this part is also simulated via `try .. catch` that would publish a message to the topic "DLQ".
- [Future] I need more time to research about how audio -> text would work.
    - Whether the library supports any form of chunking:
        - Whether there is a smart way to chunk per sentence,
        - Or, by discreet duration (how would this impact quality or to not cut mid sentence),
        - Any way to do this via streaming?
            - How would retry/resume works in this case?
- [Simulated] Store is simmulated via an in-memory dictionary
    - Audio file is stored in a blob storage.
    - Audio transcription, I would lean towards no-sql, to accommodate future development, in case more smart features to be added.
    - Patient-related records, I would consider sql, with the consideration that Doctors might want to do complex search/filter in the future (... or is there a better way to store health record??).

### Future to dos
- Current implementation doesn't separate models from DTOs, and not having any DTO validation.
- There is no pagination for `GET /records`.
- Audience control:
    - There is `clinicianId` in the record, but there is no login/access control.