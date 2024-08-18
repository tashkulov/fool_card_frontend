import React, {useEffect} from 'react';
import { AppRouter } from "./Router";
import cls from "./main.module.scss";
import "../../src/app/I18NEXT/i18n/i18n"
import Footer from './components/Footer/Footer';
import {useLocation} from "react-router-dom";

const App: React.FC = () => {
    const location = useLocation()

    useEffect(() => {
        const RegisterUser = async () => {
            try {
                if (window.Telegram && window.Telegram.WebApp) {
                    const initData = window.Telegram.WebApp.initData;
                    console.log(initData);

                    if (initData) {
                        const userData = {
                            init_data: initData,
                        };

                        // Отправка данных на сервер
                        const response = await axios.post('/receiver/authorize', userData);
                        console.log('Ответ:', response.data);

                        hasRegistered.current = true;

                        localStorage.setItem("token", response.data.token);
                        console.log(localStorage.getItem("authorization"));
                    } else {
                        console.error('Не удалось получить данные пользователя');
                    }
                } else {
                    console.error('Telegram Web App SDK не загружен');
                }
            } catch (error) {
                console.error('Ошибка при отправке запроса:', error);
            }
        };

        RegisterUser()
    }, []);


    if (location.pathname.split("/")[1] === "inGame") {
        return (
            <div className={cls.main}>
                <AppRouter/>
            </div>
        )
    }
    return (

        <div className={cls.main}>
            <AppRouter/>
            <Footer />
        </div>

    );
};

export default App;
