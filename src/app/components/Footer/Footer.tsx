import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { useTranslation } from "react-i18next";
import HeartsRiveAnimation from '../rive-conponents/hearts/hearts-component';
import ClubsRiveAnimation from '../rive-conponents/clubs/clubs-component';
import DiamondsRiveAnimation from '../rive-conponents/diamonds/diamonds-component';
import SpadesRiveAnimation from '../rive-conponents/spades/spades-component';

const Footer: React.FC = () => {
    const { t } = useTranslation()

    return (
        <footer className="main-page-navbar">
            <div className="main-page-navbar-option menu">
                <Link to="/" className="main-page-navbar-link">
                    <ClubsRiveAnimation />
                    <h1>
                        {t("Меню")}
                    </h1>
                </Link>
            </div>
            <div className="main-page-navbar-option quests">
                <Link to="/quests" className="main-page-navbar-link">
                    <HeartsRiveAnimation />
                    <h1>
                        {t("Квесты")}
                    </h1>
                </Link>
            </div>
            <div className="main-page-navbar-option open">
                <Link to="/open-games" className="main-page-navbar-link">
                    <SpadesRiveAnimation />
                    <h1>
                        {t("Открытые")}
                    </h1>
                </Link>
            </div>
            <div className="main-page-navbar-option new-game">
                <Link to="/newGame" className="main-page-navbar-link">
                    <DiamondsRiveAnimation />
                    <h1>
                        {t("Создать игру")}
                    </h1>
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
