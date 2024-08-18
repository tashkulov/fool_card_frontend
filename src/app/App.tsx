import React, { useEffect } from 'react';
import { AppRouter } from "./Router";
import cls from "./main.module.scss";
import Footer from './components/Footer/Footer';
import { useLocation } from "react-router-dom";
import { init_sockets, disconnectFromSocket } from '../socket.ts'; // Импортируем функции подключения к WebSocket

const App: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("authorization");

        if (token) {
            init_sockets(token);
        } else {
            console.error("Токен не найден, WebSocket не подключен");
        }

        // Отключение от WebSocket при размонтировании компонента
        return () => {
            disconnectFromSocket();
        };
    }, []);

    // Если текущий маршрут содержит "/inGame", рендерим только роутер
    if (location.pathname.split("/")[1] === "inGame") {
        return (
            <div className={cls.main}>
                <AppRouter />
            </div>
        );
    }

    // В остальных случаях рендерим роутер и футер
    return (
        <div className={cls.main}>
            <AppRouter />
            <Footer />
        </div>
    );
};

export default App;
