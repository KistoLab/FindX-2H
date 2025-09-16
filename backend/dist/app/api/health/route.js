"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const server_1 = require("next/server");
const mongoose_1 = __importDefault(require("mongoose"));
async function GET() {
    return server_1.NextResponse.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        services: {
            mongodb: mongoose_1.default.connection.readyState === 1 ? "connected" : "disconnected",
            socketio: "running",
            graphql: "running",
        },
    });
}
//# sourceMappingURL=route.js.map