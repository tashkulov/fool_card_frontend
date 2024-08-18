import { io } from "socket.io-client";

export function init_sockets(jtoken : string) {
    const socket = io('https://thundercoin.su',
        {
            path: 'ws://138.68.100.172:8080',
            auth: {
                token: jtoken
            }
        }
    );

    console.log("Успешная авторизация в WS", socket)
    return socket;
}