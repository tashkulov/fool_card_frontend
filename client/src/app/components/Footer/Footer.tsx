import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
    const { t } = useTranslation()

    return (
        <footer className="main-page-navbar">
            <div className="main-page-navbar-option menu">
                <Link to="/" className="main-page-navbar-link">
                    <div className="menu-icon"></div>
                    <h1>
                        {t("Меню")}
                    </h1>
                </Link>
            </div>
            <div className="main-page-navbar-option quests">
                <Link to="/quests" className="main-page-navbar-link">   
                    <div className="quests-icon"></div>
                    <h1>
                        {t("Квесты")}
                    </h1>
                </Link>
            </div>
            <div className="main-page-navbar-option open">
                <Link to="/open-games" className="main-page-navbar-link">
                    <div className="open-icon"></div>
                    <h1>
                        {t("Открытые")}
                    </h1>
                </Link>
            </div>
            <div className="main-page-navbar-option new-game">
                <Link to="/newGame" className="main-page-navbar-link">
                    <div className="new-game-icon"></div>
                    <h1>
                        {t("Создать игру")}
                    </h1>
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
