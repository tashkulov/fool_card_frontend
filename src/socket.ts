import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

// Подключение к WebSocket серверу
export const connectToSocket = () => {
    if (!socket) {
        socket = io("http://138.68.100.172:3000", {
            transports: ['websocket'], // Гарантируем использование WebSocket транспорта
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

        // Пример обработки серверных событий
        socket.on("room.new", (data) => {
            console.log("New room created:", data);
        });

        socket.on("room.del", (data) => {
            console.log("Room deleted:", data);
        });

        socket.on("switchNamespace", (data) => {
            console.log("Namespace switched:", data);
        });

        // Добавляйте остальные обработчики событий по аналогии
    }
};

// Отправка сообщения на сервер
export const sendMessage = (event: string, data: any) => {
    if (socket && socket.connected) {
        socket.emit(event, data);
    } else {
        console.error("Socket.IO is not connected");
    }
};

// Отключение от Socket.IO сервера
export const disconnectFromSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
