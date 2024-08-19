import cls from "./HeaderPlayGame.module.scss"
import {useAppSelector} from "../../../../hooks/useAppReduxToolkitTools/redux.ts";
import {RootState} from "../../../../Providers/StoreProvider/store.ts";
import all from "./svgIcon/Arrows.svg"
import classic from "./svgIcon/Joker.svg"
import rydom from "./svgIcon/Right Arrow.svg"
import nichy from "../../../img/nicy.svg"
import sosedi from "../../../img/sosedi.svg"
import perevod from "../../../img/perevod.svg"
import иконкаШута from "../../../img/coins.svg"

import {Link} from "react-router-dom";
import { sendMessage } from "../../../../../socket.ts";

const HeaderPlayGame = () => {
    const gameDate = useAppSelector((state: RootState) => state)

    // console.log(headerData)
    const handleQuit = () => {
        sendMessage('leaveRoom', () => {
            console.log('room leaved')
        })
    }

    return (
        <div className={cls.main}>
            <div className={cls.left}>
                <Link to={"/"} onClick={handleQuit}>
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
