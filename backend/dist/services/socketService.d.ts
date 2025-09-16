import { Server as SocketIOServer } from "socket.io";
import { Server as NetServer } from "http";
interface NotificationData {
    type: "info" | "success" | "warning" | "error";
    title: string;
    message: string;
    data?: any;
}
export declare function initializeSocketIOServer(server: NetServer): SocketIOServer;
export declare const socketService: {
    sendNotificationToUser: (userId: string, notification: NotificationData) => void;
    sendNotificationToRoom: (roomName: string, notification: NotificationData) => void;
    broadcastNotification: (notification: NotificationData) => void;
    sendMessageToRoom: (roomName: string, message: string, data?: any) => void;
    getConnectedUsersCount: () => number;
    getUsersInRoom: (roomName: string) => string[];
};
export {};
//# sourceMappingURL=socketService.d.ts.map