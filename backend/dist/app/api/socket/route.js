"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
exports.GET = GET;
const server_1 = require("next/server");
const socketService_1 = require("@/services/socketService");
async function POST(req) {
    try {
        const { action, data } = await req.json();
        switch (action) {
            case "send_notification":
                if (data.userId) {
                    socketService_1.socketService.sendNotificationToUser(data.userId, data.notification);
                }
                else if (data.roomName) {
                    socketService_1.socketService.sendNotificationToRoom(data.roomName, data.notification);
                }
                else {
                    socketService_1.socketService.broadcastNotification(data.notification);
                }
                break;
            case "send_room_message":
                socketService_1.socketService.sendMessageToRoom(data.roomName, data.message, data.data);
                break;
            case "get_stats":
                return server_1.NextResponse.json({
                    connectedUsers: socketService_1.socketService.getConnectedUsersCount(),
                    usersInRoom: data.roomName
                        ? socketService_1.socketService.getUsersInRoom(data.roomName)
                        : null,
                });
            default:
                return server_1.NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }
        return server_1.NextResponse.json({ success: true });
    }
    catch (error) {
        console.error("Socket API error:", error);
        return server_1.NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
async function GET(req) {
    try {
        const url = new URL(req.url);
        const action = url.searchParams.get("action");
        if (action === "stats") {
            return server_1.NextResponse.json({
                connectedUsers: socketService_1.socketService.getConnectedUsersCount(),
                status: "Socket.IO server is running",
            });
        }
        return server_1.NextResponse.json({
            status: "Socket.IO server is running",
            endpoints: {
                POST: "/api/socket - Send notifications and messages",
                GET: "/api/socket?action=stats - Get server statistics",
            },
        });
    }
    catch (error) {
        console.error("Socket API error:", error);
        return server_1.NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
//# sourceMappingURL=route.js.map