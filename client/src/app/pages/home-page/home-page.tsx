import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home-page.css';

interface User {
    photo_url: string;
    first_name: string;
}

interface HomePageProps {
    user: User | null;
}

const HomePage: React.FC<HomePageProps> = ({ user }) => {
    const navigate = useNavigate();

    const navigateTo = (path: string) => {
        navigate(path);
    };

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
                            {user?.first_name}
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
                <div className="main-page-menu-buttons">
                    <div className="main-page-menu-button" onClick={() => navigateTo('in-game')}>
                        Играть
                    </div>
                    <div className="main-page-menu-button" onClick={() => navigateTo('leaderboard')}>
                        Лидерборд
                    </div>
                    <div className="main-page-menu-button">Рефералы</div>
                    <div className="main-page-menu-button">Настройки</div>
                </div>


            </div>
            <div className='main-page-hands-cards'>
                <div className='hands'>

                </div>
            </div>
            <div className="main-page-navbar">
                <div className="main-page-navbar-option menu">
                    <div className="main-page-navbar-option menu-icon"></div>
                    <h1>Меню</h1>
                </div>
                <div className="main-page-navbar-option quests">
                    <div className="main-page-navbar-option quests-icon"></div>
                    <h1>Квесты</h1>
                </div>
                <div className="main-page-navbar-option open">
                    <div className="main-page-navbar-option open-icon"></div>
                    <h1>Открытые</h1>
                </div>
                <div className="main-page-navbar-option new-game" onClick={() => navigateTo('new-game')}>
                    <div className="main-page-navbar-option new-game-icon"></div>
                    <h1>Создать игру</h1>
                </div>
            </div>

        </div>
    );
};

export default HomePage;
