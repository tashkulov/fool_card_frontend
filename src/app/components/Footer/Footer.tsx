import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { useTranslation } from "react-i18next";
import HeartsRiveAnimation from '../rive-conponents/hearts/hearts-component';
import ClubsRiveAnimation from '../rive-conponents/clubs/clubs-component';
import DiamondsRiveAnimation from '../rive-conponents/diamonds/diamonds-component';
import SpadesRiveAnimation from '../rive-conponents/spades/spades-component';

const Footer: React.FC = () => {
    const [activeId, setActiveId] = useState<number | null>(null);

    const { t } = useTranslation()

    const handleClick = (id: number | null) => {
        setActiveId(id);
    };

    

    return (
        <footer className="main-page-navbar">
            <div className="main-page-navbar-option menu" onClick={() => handleClick(0)}>
                <Link to="/" className="main-page-navbar-link">
                    <ClubsRiveAnimation active={activeId === 0} />
                    <h1>{t("Меню")}</h1>
                </Link>
            </div>
            <div className="main-page-navbar-option quests" onClick={() => handleClick(1)}>
                <Link to="/quests" className="main-page-navbar-link">
                    <HeartsRiveAnimation active={activeId === 1} />
                    <h1>{t("Квесты")}</h1>
                </Link>
            </div>
            <div className="main-page-navbar-option open" onClick={() => handleClick(2)}>
                <Link to="/open-games" className="main-page-navbar-link">
                    <SpadesRiveAnimation active={activeId === 2} />
                    <h1>{t("Открытые")}</h1>
                </Link>
            </div>
            <div className="main-page-navbar-option new-game" onClick={() => handleClick(3)}>
                <Link to="/newGame" className="main-page-navbar-link">
                    <DiamondsRiveAnimation active={activeId === 3} />
                    <h1>{t("Создать игру")}</h1>
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
