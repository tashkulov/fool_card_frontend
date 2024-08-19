import { io } from "socket.io-client";

export function init_socket(jtoken : string) {
    const socket = io('http://138.68.100.172:3000',
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