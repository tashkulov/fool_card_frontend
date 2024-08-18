import React, { useEffect } from 'react';
import { AppRouter } from "./Router";
import cls from "./main.module.scss";
import Footer from './components/Footer/Footer';
import { useLocation } from "react-router-dom";
import { connectToSocket, disconnectFromSocket } from '../socket.ts'; // Импортируем функции подключения к WebSocket

const App: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        // Подключаемся к серверу при монтировании компонента
        connectToSocket();

        // Отключаемся от сервера при размонтировании компонента
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
