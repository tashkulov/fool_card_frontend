import { io } from "socket.io-client";

export function init_socket(jtoken : string) {
    const socket = io('https://foolcard2.shop:8080/',
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