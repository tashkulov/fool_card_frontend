import React from 'react';
import { AppRouter } from "./Router";
import cls from "./main.module.scss";
import "../../src/app/I18NEXT/i18n/i18n"

export const user = {
    photo_url: 'URL_TO_PHOTO',
    first_name: 'Имя пользователя',
};

const App: React.FC = () => {
    return (

        <div className={cls.main}>
            <AppRouter />

        </div>

    );
};

export default App;
