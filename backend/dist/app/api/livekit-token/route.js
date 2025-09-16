"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const livekit_server_sdk_1 = require("livekit-server-sdk");
async function POST(req) {
    try {
        const { userId, room } = await req.json();
        if (!userId || !room) {
            return server_1.NextResponse.json({
                error: "Bad Request: 'userId' and 'room' parameters are required.",
            }, { status: 400 });
        }
        const apiKey = process.env.LIVEKIT_API_KEY;
        const apiSecret = process.env.LIVEKIT_API_SECRET;
        if (!apiKey || !apiSecret) {
            console.error("FATAL: LiveKit API credentials are not found in .env file.");
            return server_1.NextResponse.json({
                error: "Server Configuration Error: LiveKit credentials not set.",
            }, { status: 500 });
        }
        const at = new livekit_server_sdk_1.AccessToken(apiKey, apiSecret, {
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
        return server_1.NextResponse.json({ token });
    }
    catch (error) {
        console.error("UNEXPECTED ERROR in /api/livekit-token:", error);
        return server_1.NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
//# sourceMappingURL=route.js.map