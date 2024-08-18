import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

    export const init_sockets = (token:string) => {
    if (!socket) {

        if (!token) {
            console.error("Токен не найден в localStorage");
            return;
        }

        // Подключаемся к WebSocket с токеном для аутентификации
        socket = io("http://138.68.100.172:3000", {
            transports: ['websocket'],
            auth: {
                token: token // Передаем токен
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

        socket.on("room.new", (data) => {
            console.log("New room created:", data);
        });

        socket.on("room.del", (data) => {
            console.log("Room deleted:", data);
        });

        socket.on("switchNamespace", (data) => {
            console.log("Namespace switched:", data);
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
