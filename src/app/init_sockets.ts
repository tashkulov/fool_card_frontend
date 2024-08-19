import { io } from "socket.io-client";

export function init_socket(jtoken : string) {
    const socket = io('https://77.222.37.34',
        {
            path: '/coordinator/wsg',
            auth: {
                token: jtoken
            }
        }
    );

    console.log("Успешная авторизация в WS", socket)
    return socket;
}