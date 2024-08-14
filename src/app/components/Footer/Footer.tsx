import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';
import { useTranslation } from "react-i18next";
import HeartsRiveAnimation from '../rive-conponents/footer-animations/hearts/hearts-component';
import ClubsRiveAnimation from '../rive-conponents/footer-animations/clubs/clubs-component';
import DiamondsRiveAnimation from '../rive-conponents/footer-animations/diamonds/diamonds-component';
import SpadesRiveAnimation from '../rive-conponents/footer-animations/spades/spades-component';

const Footer: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();  // Получаем текущий путь
    const [activeId, setActiveId] = useState<number | null>(0);

    // Загружаем сохраненный активный ID при загрузке компонента
    useEffect(() => {
        const savedActiveId = localStorage.getItem('activeId');
        if (savedActiveId !== null) {
            setActiveId(Number(savedActiveId));
        }
    }, []);

    const handleClick = (id: number | null) => {
        setActiveId(id);
        localStorage.setItem('activeId', id?.toString() || '');
    };

    return (
        <footer className="main-page-navbar">
            <div className="main-page-navbar-option menu" onClick={() => handleClick(0)}>
                <Link to="/" className="main-page-navbar-link">
                    <ClubsRiveAnimation active={activeId === 0 && location.pathname === "/"} />
                    <h1>{t("Меню")}</h1>
                </Link>
            </div>
            <div className="main-page-navbar-option quests" onClick={() => handleClick(1)}>
                <Link to="/quests" className="main-page-navbar-link">
                    <HeartsRiveAnimation active={activeId === 1 && location.pathname === "/quests"} />
                    <h1>{t("Квесты")}</h1>
                </Link>
            </div>
            <div className="main-page-navbar-option open" onClick={() => handleClick(2)}>
                <Link to="/open-games" className="main-page-navbar-link">
                    <SpadesRiveAnimation active={activeId === 2 && location.pathname === "/open-games"} />
                    <h1>{t("Открытые")}</h1>
                </Link>
            </div>
            <div className="main-page-navbar-option new-game" onClick={() => handleClick(3)}>
                <Link to="/newGame" className="main-page-navbar-link">
                    <DiamondsRiveAnimation active={activeId === 3 && location.pathname === "/newGame"} />
                    <h1>{t("Создать игру")}</h1>
                </Link>
            </div>
        </footer>
    );
};

export default Footer;