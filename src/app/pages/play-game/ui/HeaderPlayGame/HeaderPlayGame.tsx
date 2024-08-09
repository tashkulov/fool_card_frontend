import cls from "./HeaderPlayGame.module.scss"
import {useAppSelector} from "../../../../hooks/useAppReduxToolkitTools/redux.ts";
import {RootState} from "../../../../Providers/StoreProvider/store.ts";
import all from "../../../img/all.svg"
import classic from "../../../img/card1.svg"
import rydom from "../../../img/card3.svg"
import nichy from "../../../img/nicy.svg"
import sosedi from "../../../img/sosedi.svg"
import perevod from "../../../img/perevod.svg"
import иконкаШута from "../../../img/coins.svg"
import {Link} from "react-router-dom";

const HeaderPlayGame = () => {
    const gameDate = useAppSelector((state: RootState) => state)

    // console.log(headerData)

    return (
        <div className={cls.main}>
            <div className={cls.left}>
                <Link to={"/"}>
                    ←
                </Link>
                <img src={иконкаШута} alt=""/>
                <div className={cls.value}>
                    <b>
                        {gameDate.playGame.bet_value}
                    </b>
                </div>
            </div>
            <div className={cls.right}>
                <img src={gameDate.playGame.data.game_ending_type === "classic" ? classic : nichy} alt=""/>
                <img src={gameDate.playGame.data.game_mode === "throwing"  ?  rydom : perevod} alt=""/>
                <img src={gameDate.playGame.data.toss_mode === "neighbors" ? sosedi : all} alt=""/>
            </div>
        </div>
    );
};

export default HeaderPlayGame;
