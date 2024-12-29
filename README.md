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

## Considerations

### Creating consultation record

![Saving consultation record](docs/scribe-flow.svg)

### Fetching saved consultation records

![Fetching consultation record](docs/scribe-flow-2.svg)

Redis pubsub doesnt't have DLQ
error handling
pagination, search api, etc
store data validation
dto data validation
manage connections
login audience control

### Done
- FE: recording audio
- FE: adding timestamped notes

### To do
- BE: saving and transcribing audio
- BE: handling async flow, assuming transcribing takes time
- BE: generate report
- FE: view past consultation report