import React, {useEffect} from 'react';
import { AppRouter } from "./Router";
import cls from "./main.module.scss";
import "../../src/app/I18NEXT/i18n/i18n"
import Footer from './components/Footer/Footer';
import {useLocation} from "react-router-dom";
import {hasLoggedIn, hasRegistered, LoginUser, RegisterUser} from "./authorization.ts";

const App: React.FC = () => {
    const location = useLocation()

    useEffect(() => {
        if (!hasRegistered.current) {
            RegisterUser();
        }
        if (!hasLoggedIn.current) {
            LoginUser();
        }

    }, []);

    if (location.pathname.split("/")[1] === "inGame") {
        return (
            <div className={cls.main}>
                <AppRouter/>
            </div>
        )
    }
    return (

        <div className={cls.main}>
            <AppRouter/>
            <Footer />
        </div>

    );
};

export default App;
