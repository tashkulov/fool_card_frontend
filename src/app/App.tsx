import React from 'react';
import { AppRouter } from "./Router";
import cls from "./main.module.scss";
import { useLocation } from 'react-router-dom';
import "../../src/app/I18NEXT/i18n/i18n";
import Footer from './components/Footer/Footer';

export const user = {
    photo_url: 'URL_TO_PHOTO',
    first_name: 'Имя пользователя',
};

const AppContent: React.FC = () => {
    const location = useLocation();

    // Регулярное выражение для проверки пути /inGame/${gameId}
    const noFooterPattern = /^\/inGame\/\d+$/;

    const shouldShowFooter = !noFooterPattern.test(location.pathname);

    return (
        <div className={cls.main}>
            <AppRouter />
            {shouldShowFooter && <Footer />}
        </div>
    );
};

const App: React.FC = () => {
    return (
        
            <AppContent />
        
    );
};

export default App;
