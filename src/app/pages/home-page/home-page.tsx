import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home-page.css';
import Footer from "../../components/Footer/Footer";
import { Modal } from "../../components/Modal";
import Settings from "../Settings/ui/Settings";
import useOutsideClick from "../../hooks/useOutsideClick/useOutsideClick";
import { useTranslation } from "react-i18next";
import MyRiveAnimation from "../../components/rive-conponents/header-animations/ruby/ruby-component"
import axios from 'axios';
import Hands from "./images/main-page-hand-bg.svg"
import { store } from '../play-game/ui/store';
import HomePageHeader from './components/home-page-header';

export interface User {
    photo_url: string;
    first_name: string;
    id: number | null;
}

const HomePage: React.FC = () => {
    const [stateModeModalWindow, setSateModeModalWindow] = useState<boolean>(false)
    const refModalWindow = useRef(null)
    const { t } = useTranslation()

    const hasRegistered = useRef(false);
    const hasLoggedIn = useRef(false);


    if (window.Telegram && window.Telegram.WebApp) {
        const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
        

        if (initDataUnsafe && initDataUnsafe.user) {
            store.getState().user = initDataUnsafe.user;
            console.log(store.getState().user)
        }
    }

    useEffect(() => {
        const RegisterUser = async () => {
            try {
                if (window.Telegram && window.Telegram.WebApp) {
                    const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
                    console.log(initDataUnsafe.user.username);

                    if (initDataUnsafe && initDataUnsafe.user) {
                        const userData = {
                            "telegram_id": initDataUnsafe.user.id.toString() || "unknown",
                            "username": initDataUnsafe.user.username || "unknown",
                            "language": "ru_RU",
                            "invited_by": null
                        };

                        // Отправка данных на сервер
                        const response = await axios.post('https://foolcard2.shop/v1/auth/register', userData);
                        console.log('Ответ:', response.data, response.data.Authorization, userData);
                        
                        hasRegistered.current = true

                        localStorage.setItem("authorization", response.data.Authorization)
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

        if (!hasRegistered.current) {
            RegisterUser();
        }

        const LoginUser = async () => {
            try {
                if (window.Telegram && window.Telegram.WebApp) {
                    const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;

                    if (initDataUnsafe && initDataUnsafe.user) {
                        const userData = {
                            "telegram_id": initDataUnsafe.user.id.toString()
                        };

                        // Отправка данных на сервер
                        const response = await axios.post(`https://foolcard2.shop/v1/auth/sign_in?telegram_id=${initDataUnsafe.user.id.toString()}`, userData);
                        console.log('Ответ:', response.data, response.data.Authorization, userData);


                        hasLoggedIn.current = true
                        
                        localStorage.setItem("authorization", response.data.Authorization)
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

        if (!hasLoggedIn.current) {
            LoginUser();
        }
        
    }, []);


    useOutsideClick(refModalWindow, () => setSateModeModalWindow(false))

    return (
        <div className="main-page-container">
            <HomePageHeader />
            
            
            <div className="main-page-menu">
                <MyRiveAnimation />
                <div className="main-page-menu-buttons">
                    <Link to={'/inGame'}>
                        <div className="main-page-menu-button">
                            {t("Играть")}
                        </div>
                    </Link>
                    <Link to={'/leaderboard'}>
                        <div className="main-page-menu-button">
                            {t("Лидерборд")}
                        </div>
                    </Link>
                    <Link to={"/referrals"}>
                        <div className="main-page-menu-button">
                            {t("Рефералы")}
                        </div>
                    </Link>
                    <button onClick={() => setSateModeModalWindow(prev => !prev)} className="main-page-menu-button">
                        {t("Настройки")}
                    </button>
                </div>
            </div>
            <img src={Hands} className='main-page-hands-cards'/>
            <Modal mode={stateModeModalWindow} ref={refModalWindow}>
                <Settings />
            </Modal>
            <Footer />
        </div>
    );
};

export default HomePage;
