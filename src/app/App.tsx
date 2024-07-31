import React from 'react';
import { AppRouter } from "./Router";
import cls from "./main.module.scss";
import "../../src/app/I18NEXT/i18n/i18n"
import Footer from './components/Footer/Footer';

export const user = {
    photo_url: 'URL_TO_PHOTO',
    first_name: 'Имя пользователя',
};

const App: React.FC = () => {
    return (

        <div className={cls.main}>
            <AppRouter />
            <Footer />
        </div>

    );
};

export default App;
