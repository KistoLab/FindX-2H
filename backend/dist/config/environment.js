"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = exports.config = void 0;
exports.config = {
    // LiveKit Configuration
    livekit: {
        apiKey: process.env.LIVEKIT_API_KEY || "",
        apiSecret: process.env.LIVEKIT_API_SECRET || "",
        wsUrl: process.env.LIVEKIT_WS_URL || "wss://your-livekit-server.com",
        httpUrl: process.env.LIVEKIT_HTTP_URL || "https://your-livekit-server.com",
    },
    // Server Configuration
    server: {
        port: parseInt(process.env.PORT || "8000", 10),
        nodeEnv: process.env.NODE_ENV || "development",
        corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
    },
    // Database Configuration
    database: {
        mongodbUri: process.env.FindX_MONGODB_URL ||
            process.env.MONGODB_URI ||
            "mongodb://localhost:27017/findx",
    },
    // WebSocket Configuration
    websocket: {
        port: parseInt(process.env.WS_PORT || "8000", 10),
    },
};
// Validation function
const validateConfig = () => {
    const requiredEnvVars = ["LIVEKIT_API_KEY", "LIVEKIT_API_SECRET"];
    const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);
    if (missingVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`);
    }
};
exports.validateConfig = validateConfig;
//# sourceMappingURL=environment.js.map