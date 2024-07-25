import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home-page.css';
import Footer from "../../components/Footer/Footer";
import { Modal } from "../../components/Modal";
import Settings from "../Settings/ui/Settings";
import useOutsideClick from "../../hooks/useOutsideClick/useOutsideClick";
import { useTranslation } from "react-i18next";
import MyRiveAnimation from "../../components/rive-conponents/ruby/ruby-component"
// import axios from 'axios';

interface User {
    photo_url: string;
    first_name: string;
}

interface HomePageProps {
    user?: User | null;
}

const HomePage: React.FC<HomePageProps> = ({ user }) => {
    const [stateModeModalWindow, setSateModeModalWindow] = useState<boolean>(false)
    const refModalWindow = useRef(null)
    const { t } = useTranslation()

    useEffect(() => {
        const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
        console.log(initDataUnsafe.user.username);

        // const RegisterUser = async () => {
        //     try {
        //         if (window.Telegram && window.Telegram.WebApp) {
        //             const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
        //             console.log(initDataUnsafe.user.username);

        //             if (initDataUnsafe && initDataUnsafe.user) {
        //                 const userData = {
        //                     "telegram_id": initDataUnsafe.user.id.toString() || "unknown",
        //                     "username": initDataUnsafe.user.username || "unknown",
        //                     "language": initDataUnsafe.user.language_code || "ru_RU",
        //                     "invited_by": 0 // Если у вас есть информация о пригласившем пользователе, замените это значение
        //                 };

        //                 // Отправка данных на сервер
        //                 const response = await axios.post('https://foolcard2.shop/v1/auth/register', userData);
        //                 console.log('Ответ:', response.data, userData);
        //             } else {
        //                 console.error('Не удалось получить данные пользователя');
        //             }
        //         } else {
        //             console.error('Telegram Web App SDK не загружен');
        //         }
        //     } catch (error) {
        //         console.error('Ошибка при отправке запроса:', error);
        //     }
        // };

        // RegisterUser();
        // const LoginUser = async () => {
        //     try {
        //         if (window.Telegram && window.Telegram.WebApp) {
        //             const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;

        //             if (initDataUnsafe && initDataUnsafe.user) {
        //                 const userData = {
        //                     "telegram_id": initDataUnsafe.user.id.toString()
        //                 };

        //                 // Отправка данных на сервер
        //                 const response = await axios.post('https://foolcard2.shop/v1/auth/sign-in', userData);
        //                 console.log('Ответ:', response.data, userData);
        //             } else {
        //                 console.error('Не удалось получить данные пользователя');
        //             }
        //         } else {
        //             console.error('Telegram Web App SDK не загружен');
        //         }
        //     } catch (error) {
        //         console.error('Ошибка при отправке запроса:', error);
        //     }
        // };

        // LoginUser();
    }, []);

    useOutsideClick(refModalWindow, () => setSateModeModalWindow(false))

    return (

        <div className="main-page-container">
            <div className="main-page-header">
                <div className="main-page-header-content">
                    <div className="main-page-header-content-avatar-border">
                        <div className="main-page-header-content-avatar">
                            {user?.photo_url}
                        </div>
                    </div>

                    <div className="main-page-header-content-data">
                        <div className="main-page-header-content-data-username">
                            {user?.first_name || "Guest"}
                        </div>
                        <div className="main-page-header-content-data-credits">
                            <div className="main-page-header-content-data-credits-1">
                                <div className="main-page-header-content-data-credits-1-icon"></div>
                                <div className="main-page-header-content-data-credits-1-value">
                                    100K
                                </div>
                            </div>
                            <div className="main-page-header-content-data-credits-1">
                                <div className="main-page-header-content-data-credits-2-icon"></div>
                                <div className="main-page-header-content-data-credits-1-value">
                                    152.5K
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
            <div className='main-page-hands-cards'>

            </div>
            <Modal mode={stateModeModalWindow} ref={refModalWindow}>
                <Settings />
            </Modal>
            <Footer />
        </div>
    );
};

export default HomePage;
