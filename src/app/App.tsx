// import React, { useEffect } from 'react';
import { AppRouter } from "./Router";
import cls from "./main.module.scss";
import Footer from './components/Footer/Footer';
import { useLocation } from "react-router-dom";
// import {init_sockets , disconnectFromSocket } from '../socket.ts'; // Импортируем функции подключения к WebSocket
import {RegisterUser} from "./authorization.ts";
import { useEffect } from "react";
import { disconnectFromSocket, init_sockets } from "./socket.ts";

const App: React.FC = () => {
    const location = useLocation();
    const auth_token = localStorage.getItem('authorization');

    useEffect(() => {
        RegisterUser()

        if (!auth_token) {
            console.error("Токен не найден в localStorage");
            return;
        } 

        init_sockets(auth_token);

        return () => {
            disconnectFromSocket();
        };
    }, []);

    

    if (location.pathname.split("/")[1] === "inGame") {
        return (
            <div className={cls.main}>
                <AppRouter />
            </div>
        );
    }

    return (
        <div className={cls.main}>
            <AppRouter />
            <Footer />
        </div>
    );
};

export default App;
