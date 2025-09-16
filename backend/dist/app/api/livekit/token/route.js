"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
exports.OPTIONS = OPTIONS;
const server_1 = require("next/server");
const livekit_server_sdk_1 = require("livekit-server-sdk");
async function POST(req) {
    try {
        // Validate environment variables
        if (!process.env.LIVEKIT_API_KEY || !process.env.LIVEKIT_API_SECRET) {
            return server_1.NextResponse.json({ error: "LiveKit API credentials not configured" }, {
                status: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
            });
        }
        const { studentId, roomName } = await req.json();
        // Validate input parameters
        if (!studentId || !roomName) {
            return server_1.NextResponse.json({ error: "studentId and roomName are required" }, {
                status: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
            });
        }
        // Validate that studentId and roomName are strings
        if (typeof studentId !== "string" || typeof roomName !== "string") {
            return server_1.NextResponse.json({ error: "studentId and roomName must be strings" }, {
                status: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
            });
        }
        const at = new livekit_server_sdk_1.AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
            identity: studentId,
            ttl: "1h", // Token expires in 1 hour
        });
        // Add comprehensive permissions
        at.addGrant({
            roomJoin: true,
            room: roomName,
            canPublish: true, // Allow publishing audio/video
            canSubscribe: true, // Allow subscribing to others' tracks
            canPublishData: true, // Allow publishing data messages
            canUpdateOwnMetadata: true, // Allow updating own metadata
        });
        const token = await at.toJwt();
        console.log("LiveKit token:", token);
        return server_1.NextResponse.json({ token }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        });
    }
    catch (error) {
        console.error("Error generating LiveKit token:", error);
        return server_1.NextResponse.json({ error: "Failed to generate token" }, {
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        });
    }
}
// OPTIONS method for CORS preflight
async function OPTIONS(req) {
    return new server_1.NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
//# sourceMappingURL=route.js.map