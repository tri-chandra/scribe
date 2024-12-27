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

Run tests:
```
npm test
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

Redis pubsub doesnt't have DLQ
error handling
pagination, search api, etc
store data validation
dto data validation

### Done
- FE: recording audio
- FE: adding timestamped notes

### To do
- BE: saving and transcribing audio
- BE: handling async flow, assuming transcribing takes time
- BE: generate report
- FE: view past consultation report