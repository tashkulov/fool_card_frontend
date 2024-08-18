import React, { useEffect } from 'react';
import { AppRouter } from "./Router";
import cls from "./main.module.scss";
import Footer from './components/Footer/Footer';
import { useLocation } from "react-router-dom";
import {init_sockets , disconnectFromSocket } from '../socket.ts'; // Импортируем функции подключения к WebSocket
import {hasLoggedIn, LoginUser, RegisterUser} from "./authorization.ts";

const App: React.FC = () => {
    const location = useLocation();

    RegisterUser()

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
