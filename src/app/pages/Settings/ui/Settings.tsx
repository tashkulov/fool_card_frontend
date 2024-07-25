import cls from "./Settings.module.scss"
import {useState} from "react";
import chekedIcon from "../../img/checedIcon.svg"
import {useTranslation} from "react-i18next";

const Settings = () => {
    const [stateLanguage, setStateLanguage] = useState<boolean>(localStorage.getItem('i18nextLng') == "ru" ? false : true)
    const {t, i18n} = useTranslation()

    return (
        <div className={cls.main}>
            <h3>
                {t("Настройки")}
            </h3>
            <div>
                {t("языки")}
            </div>
            <div className={cls.wrapperButtons}>
                <button onClick={() => {
                    setStateLanguage(false)
                    i18n.changeLanguage("ru")
                }}>
                    Русский
                    {!stateLanguage ? <img src={chekedIcon} alt=""/>:<></>}
                </button>
                <button onClick={() => {
                    setStateLanguage(true)
                    i18n.changeLanguage("en")
                }}>
                    English
                    {stateLanguage ? <img src={chekedIcon} alt=""/>:<></>}
                </button>
            </div>


        </div>
    );
};

export default Settings;