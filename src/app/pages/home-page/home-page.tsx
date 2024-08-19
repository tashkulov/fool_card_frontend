import React, {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import cls from './home-page.module.scss'; // Переименуйте файл css
import Footer from "../../components/Footer/Footer";
import {Modal} from "../../components/Modal";
import Settings from "../Settings/ui/Settings";
import useOutsideClick from "../../hooks/useOutsideClick/useOutsideClick";
import {useTranslation} from "react-i18next";
import MyRiveAnimation from "../../components/rive-conponents/header-animations/ruby/ruby-component"
import HomePageHeader from './components/home-page-header';
import MenuHandsAnim from "../../components/rive-conponents/menu-hands-anim/menu-hands-anim";

export interface User {
    photo_url: string;
    first_name: string;
    id: number | null;
}

const HomePage: React.FC = () => {
    const [stateModeModalWindow, setSateModeModalWindow] = useState<boolean>(false)
    const refModalWindow = useRef(null)
    const {t} = useTranslation()


    useOutsideClick(refModalWindow, () => setSateModeModalWindow(false))

    return (
        <div className={cls.mainPageContainer}>
            <HomePageHeader/>
            <div className={cls.mainPageMenu}>
                <MyRiveAnimation/>
                <div className={cls.mainPageMenuButtons}>
                        <div className={cls.mainPageMenuButton}>
                            <Link to={'/inGame'}>
                            {t("Играть")}
                            </Link>
                        </div>
                        <div className={cls.mainPageMenuButton}>
                            <Link to={'/leaderboard'}>

                            {t("Лидерборд")}3
                            </Link>
                        </div>
                        <div className={cls.mainPageMenuButton}>
                            <Link to={"/referrals"}>
                            {t("Рефералы")}
                            </Link>

                        </div>
                    <button onClick={() => setSateModeModalWindow(prev => !prev)} className={cls.mainPageMenuButton}>
                        {t("Настройки")}
                    </button>
                </div>
            </div>
            <MenuHandsAnim />
            <Modal mode={stateModeModalWindow} ref={refModalWindow}>
                <Settings/>
            </Modal>
            <Footer/>
        </div>
    );
};

export default HomePage;
