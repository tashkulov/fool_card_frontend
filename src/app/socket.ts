import { io, Socket } from "socket.io-client";

export let socket: Socket | null = null;

export const init_sockets = (token: string) => {
    if (!socket) {
        if (!token) {
            console.error("Токен не найден в localStorage");
            return;
        }

        socket = io("http://138.68.100.172:3000", {
            transports: ['websocket'],
            auth: {
                token: token
            },
        });

        socket.on("connect", () => {
            console.log("Connected to Socket.IO server");
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from Socket.IO server");
        });

        socket.on("connect_error", (err) => {
            console.error("Connection error:", err);
        });

    }
};

export const sendMessage = (event: string, data: any) => {
    if (socket && socket.connected) {
        socket.emit(event, data);
    } else {
        console.error("Socket.IO is not connected");
    }
};

export const disconnectFromSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
