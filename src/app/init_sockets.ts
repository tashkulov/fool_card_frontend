import { io } from "socket.io-client";

export function init_socket(jtoken : string) {
    const socket = io('https://foolcard2.shop/',
        {
            path: '/reciever/wsg',
            auth: {
                token: jtoken
            }
        }
    );

    console.log("Успешная авторизация в WS", socket)
    return socket;
}