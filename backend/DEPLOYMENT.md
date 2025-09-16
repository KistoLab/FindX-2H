# FindX Backend Deployment Guide

## Overview

This is an Express.js server with GraphQL, Socket.IO, and MongoDB integration, ready for deployment on Render.

## Environment Variables Required

Set these environment variables in your Render dashboard:

### Required

- `FindX_MONGODB_URL` - MongoDB connection string
- `LIVEKIT_API_KEY` - LiveKit API key
- `LIVEKIT_API_SECRET` - LiveKit API secret

### Optional

- `PORT` - Server port (default: 8000, Render uses 10000)
- `NODE_ENV` - Environment (production/development)
- `CORS_ORIGIN` - Frontend URL for CORS
- `LIVEKIT_WS_URL` - LiveKit WebSocket URL
- `LIVEKIT_HTTP_URL` - LiveKit HTTP URL

## Deployment on Render

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Use the following settings:

   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node
   - **Plan**: Free (or upgrade as needed)

4. Add all required environment variables in the Render dashboard

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/graphql` - GraphQL endpoint
- `POST /api/livekit-token` - LiveKit token generation
- `POST /api/socket` - Socket.IO management
- `GET /api/socket?action=stats` - Socket.IO statistics

## Socket.IO Events

The server supports all the original Socket.IO events:

- `authenticate` - User authentication
- `join-room` / `join_room` - Join a room
- `leave-room` / `leave_room` - Leave a room
- `send_notification` - Send notifications
- `video-offer` - WebRTC video offer
- `video-answer` - WebRTC video answer
- `ice-candidate` - WebRTC ICE candidate
- `room_message` - Room messaging
- `direct_message` - Direct messaging
- `ping` / `pong` - Connection health check

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Features

✅ Express.js server
✅ GraphQL API with Apollo Server
✅ Socket.IO real-time communication
✅ MongoDB integration
✅ LiveKit video calling
✅ CORS support
✅ Security headers (Helmet)
✅ Compression
✅ Health checks
✅ Environment configuration
✅ TypeScript support
