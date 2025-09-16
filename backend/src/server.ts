import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import mongoose from "mongoose";
import { ApolloServer, HeaderMap } from "@apollo/server";
import { buildContext } from "@/types/context";
import { AccessToken } from "livekit-server-sdk";

// Import your existing modules
import { typeDefs } from "@/schemas";
import { resolvers } from "@/resolvers";
import { connectDataBase } from "@/database";
import { config, validateConfig } from "@/config/environment";

// Socket.IO types
interface Notification {
  title: string;
  message: string;
  [key: string]: any;
}

interface VideoOfferData {
  to: string;
  sdp: any;
}

interface VideoAnswerData {
  to: string;
  sdp: any;
}

interface IceCandidateData {
  to: string;
  candidate: any;
}

interface SocketWithUser extends SocketIOServer {
  studentId?: string;
  organizerId?: string;
}

// Store connected users for Socket.IO
const connectedUsers = new Map<
  string,
  { userId: string; username?: string; roomName?: string }
>();

async function startServer() {
  try {
    // 1️⃣ Validate environment configuration
    validateConfig();

    // 2️⃣ Connect to MongoDB
    await connectDataBase();
    console.log("✅ MongoDB Connected");

    // 3️⃣ Create Express app
    const app = express();
    const httpServer = createServer(app);

    // 4️⃣ Setup Socket.IO
    const io = new SocketIOServer(httpServer, {
      path: "/socket.io",
      cors: {
        origin: [config.server.corsOrigin, "http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    // 5️⃣ Express middleware
    app.use(
      helmet({
        contentSecurityPolicy: false, // Disable for GraphQL Playground
      })
    );
    app.use(compression());
    app.use(
      cors({
        origin: [config.server.corsOrigin, "http://localhost:3000"],
        credentials: true,
      })
    );
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true }));

    // 6️⃣ Setup Apollo GraphQL Server
    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      introspection: true,
    });

    await apolloServer.start();

    // 7️⃣ GraphQL endpoint
    app.post("/api/graphql", async (req, res) => {
      try {
        const context = await buildContext(req);

        // Convert Express headers to Apollo Server HeaderMap format
        const headers = new HeaderMap();
        Object.entries(req.headers).forEach(([key, value]) => {
          if (typeof value === "string") {
            headers.set(key, value);
          } else if (Array.isArray(value)) {
            headers.set(key, value.join(", "));
          }
        });

        const result = await apolloServer.executeHTTPGraphQLRequest({
          httpGraphQLRequest: {
            method: req.method,
            headers: headers,
            search: req.url.includes("?") ? req.url.split("?")[1] : "",
            body: req.body,
          },
          context: () => Promise.resolve(context),
        });

        if (result.body.kind === "complete") {
          const bodyString = result.body.string;
          try {
            const jsonData = JSON.parse(bodyString);
            res.status(result.status || 200).json(jsonData);
          } catch (parseError) {
            // If it's not JSON, send as text
            res.status(result.status || 200).send(bodyString);
          }
        } else {
          res.status(result.status || 200).json(result.body);
        }
      } catch (error) {
        console.error("GraphQL error:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        const errorStack = error instanceof Error ? error.stack : undefined;
        console.error("Error details:", {
          message: errorMessage,
          stack: errorStack,
          reqMethod: req.method,
          reqUrl: req.url,
          reqHeaders: req.headers,
        });
        res.status(500).json({
          error: "Internal server error",
          details: errorMessage,
        });
      }
    });

    // GraphQL GET endpoint for introspection
    app.get("/api/graphql", async (req, res) => {
      try {
        const context = await buildContext(req);

        // Convert Express headers to Apollo Server HeaderMap format
        const headers = new HeaderMap();
        Object.entries(req.headers).forEach(([key, value]) => {
          if (typeof value === "string") {
            headers.set(key, value);
          } else if (Array.isArray(value)) {
            headers.set(key, value.join(", "));
          }
        });

        const result = await apolloServer.executeHTTPGraphQLRequest({
          httpGraphQLRequest: {
            method: req.method,
            headers: headers,
            search: req.url.includes("?") ? req.url.split("?")[1] : "",
            body: req.body,
          },
          context: () => Promise.resolve(context),
        });

        if (result.body.kind === "complete") {
          const bodyString = result.body.string;
          try {
            const jsonData = JSON.parse(bodyString);
            res.status(result.status || 200).json(jsonData);
          } catch (parseError) {
            // If it's not JSON, send as text (for GraphQL Playground HTML)
            res.status(result.status || 200).send(bodyString);
          }
        } else {
          res.status(result.status || 200).json(result.body);
        }
      } catch (error) {
        console.error("GraphQL GET error:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({
          error: "Internal server error",
          details: errorMessage,
        });
      }
    });

    // 8️⃣ Health check endpoint
    app.get("/api/health", (req, res) => {
      res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        services: {
          mongodb:
            mongoose.connection.readyState === 1 ? "connected" : "disconnected",
          socketio: "running",
          graphql: "running",
        },
      });
    });

    // 9️⃣ LiveKit token endpoint
    app.post("/api/livekit-token", async (req, res) => {
      try {
        const { userId, room } = req.body;

        if (!userId || !room) {
          return res.status(400).json({
            error: "Bad Request: 'userId' and 'room' parameters are required.",
          });
        }

        const apiKey = config.livekit.apiKey;
        const apiSecret = config.livekit.apiSecret;

        if (!apiKey || !apiSecret) {
          console.error(
            "FATAL: LiveKit API credentials are not found in .env file."
          );
          return res.status(500).json({
            error: "Server Configuration Error: LiveKit credentials not set.",
          });
        }

        const at = new AccessToken(apiKey, apiSecret, {
          identity: userId,
          name: userId,
        });

        at.addGrant({
          roomJoin: true,
          room,
          canPublish: true,
          canSubscribe: true,
        });

        const token = await at.toJwt();
        res.json({ token });
      } catch (error) {
        console.error("UNEXPECTED ERROR in /api/livekit-token:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Alternative LiveKit token endpoint (for frontend compatibility)
    app.post("/api/livekit/token", async (req, res) => {
      try {
        const { userId, room } = req.body;

        if (!userId || !room) {
          return res.status(400).json({
            error: "Bad Request: 'userId' and 'room' parameters are required.",
          });
        }

        const apiKey = config.livekit.apiKey;
        const apiSecret = config.livekit.apiSecret;

        if (!apiKey || !apiSecret) {
          console.error(
            "FATAL: LiveKit API credentials are not found in .env file."
          );
          return res.status(500).json({
            error: "Server Configuration Error: LiveKit credentials not set.",
          });
        }

        const at = new AccessToken(apiKey, apiSecret, {
          identity: userId,
          name: userId,
        });

        at.addGrant({
          roomJoin: true,
          room,
          canPublish: true,
          canSubscribe: true,
        });

        const token = await at.toJwt();
        res.json({ token });
      } catch (error) {
        console.error("UNEXPECTED ERROR in /api/livekit/token:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // 🔟 Socket.IO management endpoints
    app.post("/api/socket", (req, res) => {
      try {
        const { action, data } = req.body;

        switch (action) {
          case "send_notification":
            if (data.userId) {
              io.to(`user:${data.userId}`).emit("notification", {
                ...data.notification,
                timestamp: new Date().toISOString(),
              });
            } else if (data.roomName) {
              io.to(data.roomName).emit("notification", {
                ...data.notification,
                timestamp: new Date().toISOString(),
              });
            } else {
              io.emit("notification", {
                ...data.notification,
                timestamp: new Date().toISOString(),
              });
            }
            break;

          case "send_room_message":
            io.to(data.roomName).emit("room_message", {
              from: { userId: "system", username: "System" },
              roomName: data.roomName,
              message: data.message,
              data: data.data,
              timestamp: new Date().toISOString(),
            });
            break;

          case "get_stats":
            return res.json({
              connectedUsers: connectedUsers.size,
              usersInRoom: data.roomName
                ? Array.from(io.sockets.adapter.rooms.get(data.roomName) || [])
                : null,
            });

          default:
            return res.status(400).json({ error: "Invalid action" });
        }

        res.json({ success: true });
      } catch (error) {
        console.error("Socket API error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.get("/api/socket", (req, res) => {
      try {
        const action = req.query.action as string;

        if (action === "stats") {
          return res.json({
            connectedUsers: connectedUsers.size,
            status: "Socket.IO server is running",
          });
        }

        res.json({
          status: "Socket.IO server is running",
          endpoints: {
            POST: "/api/socket - Send notifications and messages",
            GET: "/api/socket?action=stats - Get server statistics",
          },
        });
      } catch (error) {
        console.error("Socket API error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // 1️⃣1️⃣ Socket.IO connection handling
    io.on("connection", (socket: any) => {
      const { studentId, organizerId } = socket.handshake.auth;
      const userId = studentId || organizerId;

      console.log(
        `⚡ User connected: student=${studentId}, organizer=${organizerId}`
      );

      // Store user data
      connectedUsers.set(socket.id, {
        userId: userId || socket.id,
        username: socket.handshake.auth.username,
      });

      // Join user to their personal room
      socket.join(`user:${userId || socket.id}`);

      // Handle user authentication/identification
      socket.on(
        "authenticate",
        (data: { userId: string; username?: string }) => {
          const { userId: authUserId, username } = data;

          connectedUsers.set(socket.id, {
            userId: authUserId,
            username,
          });

          socket.join(`user:${authUserId}`);
          console.log(
            `User authenticated: ${authUserId} (${username || "Anonymous"})`
          );

          socket.emit("authenticated", {
            userId: authUserId,
            socketId: socket.id,
            message: "Successfully authenticated",
          });

          socket.emit("notification", {
            type: "success",
            title: "Connected",
            message: "Connected to notification server",
          });
        }
      );

      // Room join / leave
      socket.on("join-room", (roomId: string) => {
        socket.join(roomId);
        const userData = connectedUsers.get(socket.id);
        if (userData) {
          userData.roomName = roomId;
          connectedUsers.set(socket.id, userData);
        }
        console.log(`${userId} joined room ${roomId}`);
      });

      socket.on("leave-room", (roomId: string) => {
        socket.leave(roomId);
        const userData = connectedUsers.get(socket.id);
        if (userData) {
          userData.roomName = undefined;
          connectedUsers.set(socket.id, userData);
        }
        console.log(`${userId} left room ${roomId}`);
      });

      // Handle joining rooms (alternative event name)
      socket.on("join_room", (data: { roomName: string }) => {
        const { roomName } = data;
        const userData = connectedUsers.get(socket.id);

        if (userData) {
          if (userData.roomName) {
            socket.leave(userData.roomName);
          }

          socket.join(roomName);
          userData.roomName = roomName;
          connectedUsers.set(socket.id, userData);

          console.log(`User ${userData.userId} joined room: ${roomName}`);

          socket.to(roomName).emit("user_joined", {
            userId: userData.userId,
            username: userData.username,
            roomName,
          });

          socket.emit("room_joined", {
            roomName,
            message: `Joined room: ${roomName}`,
          });
        }
      });

      // Handle leaving rooms (alternative event name)
      socket.on("leave_room", () => {
        const userData = connectedUsers.get(socket.id);

        if (userData && userData.roomName) {
          const roomName = userData.roomName;

          socket.leave(roomName);
          userData.roomName = undefined;
          connectedUsers.set(socket.id, userData);

          console.log(`User ${userData.userId} left room: ${roomName}`);

          socket.to(roomName).emit("user_left", {
            userId: userData.userId,
            username: userData.username,
            roomName,
          });

          socket.emit("room_left", {
            roomName,
            message: `Left room: ${roomName}`,
          });
        }
      });

      // Notification handling
      socket.on("send_notification", (notification: Notification) => {
        const userData = connectedUsers.get(socket.id);
        if (userData) {
          console.log(
            `Notification from ${userData.userId}: ${notification.title}`
          );

          socket.emit("notification", {
            ...notification,
            senderId: userData.userId,
            timestamp: new Date().toISOString(),
          });
        }
      });

      // Video call events
      socket.on("video-offer", (data: VideoOfferData) => {
        io.to(data.to).emit("video-offer", {
          from: userId,
          sdp: data.sdp,
        });
      });

      socket.on("video-answer", (data: VideoAnswerData) => {
        io.to(data.to).emit("video-answer", {
          from: userId,
          sdp: data.sdp,
        });
      });

      socket.on("ice-candidate", (data: IceCandidateData) => {
        io.to(data.to).emit("ice-candidate", {
          from: userId,
          candidate: data.candidate,
        });
      });

      // Room messages
      socket.on(
        "room_message",
        (data: { roomName: string; message: string; data?: any }) => {
          const { roomName, message, data: messageData } = data;
          const userData = connectedUsers.get(socket.id);

          if (userData) {
            console.log(
              `Room message from ${userData.userId} to ${roomName}: ${message}`
            );

            io.to(roomName).emit("room_message", {
              from: {
                userId: userData.userId,
                username: userData.username,
              },
              roomName,
              message,
              data: messageData,
              timestamp: new Date().toISOString(),
            });
          }
        }
      );

      // Direct messages
      socket.on(
        "direct_message",
        (data: { targetUserId: string; message: string; data?: any }) => {
          const { targetUserId, message, data: messageData } = data;
          const userData = connectedUsers.get(socket.id);

          if (userData) {
            console.log(
              `Direct message from ${userData.userId} to ${targetUserId}: ${message}`
            );

            io.to(`user:${targetUserId}`).emit("direct_message", {
              from: {
                userId: userData.userId,
                username: userData.username,
              },
              message,
              data: messageData,
              timestamp: new Date().toISOString(),
            });
          }
        }
      );

      // Handle ping/pong for connection health
      socket.on("ping", () => {
        socket.emit("pong", {
          timestamp: new Date().toISOString(),
        });
      });

      // Handle disconnection
      socket.on("disconnect", (reason: string) => {
        const userData = connectedUsers.get(socket.id);

        if (userData) {
          console.log(`❌ User disconnected: ${userData.userId} (${reason})`);

          // Notify room members if user was in a room
          if (userData.roomName) {
            socket.to(userData.roomName).emit("user_left", {
              userId: userData.userId,
              username: userData.username,
              roomName: userData.roomName,
              reason: "disconnected",
            });
          }

          // Remove from connected users
          connectedUsers.delete(socket.id);
        }
      });
    });

    // 1️⃣1️⃣ Catch-all route for non-API requests
    app.get("*", (req, res) => {
      res.json({
        message: "FindX Backend API Server",
        version: "1.0.0",
        endpoints: {
          graphql: "/api/graphql",
          health: "/api/health",
          livekit: "/api/livekit-token",
          livekitAlt: "/api/livekit/token",
          socket: "/api/socket",
        },
        documentation: "This is a backend API server. Use the endpoints above.",
      });
    });

    // 1️⃣2️⃣ Start server
    const port = config.server.port;
    httpServer.listen(port, () => {
      console.log("======================================================");
      console.log(`✅ Express Server ready: http://localhost:${port}`);
      console.log(`🚀 GraphQL endpoint: http://localhost:${port}/api/graphql`);
      console.log(`💬 Socket.IO: ws://localhost:${port}/socket.io`);
      console.log(`🏥 Health check: http://localhost:${port}/api/health`);
      console.log(
        `🎥 LiveKit token: http://localhost:${port}/api/livekit-token`
      );
      console.log("======================================================");
    });
  } catch (error) {
    console.error("❌ Fatal server error:", error);
    process.exit(1);
  }
}

startServer();
