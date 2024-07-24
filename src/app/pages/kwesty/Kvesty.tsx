import './Kvesty.css';
import kvest1 from '../img/kvest1.svg';
import kvest2 from '../img/kvest2.svg';
import kvest3 from '../img/kvesty3.svg';
import OneKvest from "../../components/OneKvest/OneKvest";
import SkeletonPage from "../../components/SkeletonPage/ui/SkeletPage";
import {useTranslation} from "react-i18next";
import React from 'react';

const Kvesty = () => {
    const {t} = useTranslation()

    return (
    <SkeletonPage textHeader={t("Квесты")}>
        <div className='container-kwest'>
            <div className='kvesty-list'>
                <OneKvest image={kvest1} headText="Выиграть 5000 монет" description="XP 30.5" buttonText='Начать'/>
                <OneKvest image={kvest2} headText="Выиграть 2342 монет" description="XP 30.5" buttonText='Начать'/>
                <OneKvest image={kvest3} headText="Выиграть 5000 монет" description="XP 30.5"
                          buttonText='Получить'/>
                <OneKvest image={kvest3} headText="Выиграть 4534 монет" description="XP 30.5"
                          buttonText='Получить'/>
                <OneKvest image={kvest3} headText="Выиграть 5000 монет" description="XP 30.5"
                          buttonText='Получить'/>
                <OneKvest image={kvest3} headText="Выиграть 523 монет" description="XP 30.5" buttonText='Начать'/>
            </div>
        </div>
    </SkeletonPage>
);
};

export default Kvesty;
