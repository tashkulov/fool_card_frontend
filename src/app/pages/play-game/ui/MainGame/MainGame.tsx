import cls from "./MainGame.module.scss"
import ava from "../../images/Сircle Right.svg"

type TMainGameProps = {

}

const MainGame = (props: TMainGameProps) => {
    const {} =props


    return (
        <div className={cls.main}>
            <div className={cls.wrapperImg}>
                <img src={ava} alt="avatars players"/>
                <div className={cls.wrapperTextGetReady}>
                    Нажми Готов
                </div>
            </div>
        </div>
    );
};

export default MainGame;