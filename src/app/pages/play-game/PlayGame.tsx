import './play-game.css';
// import card1 from "../img/card1.svg";
// import card2 from '../img/card2.svg';
// import card3 from '../img/card3.svg';
// import GamePlay from "../img/Gameplay_Avatar.svg";
// import coins from "../img/coins.svg";
// import arrow from "../img/Arrow1.svg";
import {useEffect, useState} from "react";
// import back_card from '../../../assets/cards/back/back_3.svg';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../hooks/useAppReduxToolkitTools/redux.ts";
import { RootState } from "../../Providers/StoreProvider/store.ts";
// import { CountdownCircleTimer } from "react-countdown-circle-timer";
// import WaitingForPlayers from "./WaitingRoom/WaitingForPlayers.tsx";
import {joinInGameService} from "./statePlayGame/service/joinInGameService.ts";
import {getPlayers} from "./statePlayGame/service/getPlayers.ts";
import {getCurrentTableThunk} from "./statePlayGame/service/getCurrentTableThunk.ts";
import {getGames} from "./statePlayGame/service/getGames.ts";
// import {statePlayGameSliceAction, } from "./statePlayGame";
import cls from "./PlayGame.module.scss"
import HeaderPlayGame from "./ui/HeaderPlayGame/HeaderPlayGame.tsx";
import FooterPlayGame from "./ui/FooterPlayGame/FooterPlayGame.tsx";
import MainGame from "./ui/MainGame/MainGame.tsx";

const PlayGame = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state: RootState) => state.playGame)
    const { gameId, who } = useParams<{ gameId: string, who: string, }>();
    const [stateButtonReadiness, setStateButtonReadiness] = useState<boolean>(false)

    useEffect(() => {
        if (gameId) {
            dispatch(getCurrentTableThunk(Number(gameId)));

            if (who === "guest") {
                if (sessionStorage.getItem("statusPlayer") === gameId) {
                    dispatch(joinInGameService(Number(gameId)));
                    sessionStorage.setItem("statusPlayer", gameId)
                }
                dispatch(getPlayers(Number(gameId)));
            } else {
                dispatch(getPlayers(Number(gameId)));
            }
        }
    }, [dispatch, gameId, who])

    useEffect(() => {
        dispatch(getGames(Number(gameId)))
    }, []);

    useEffect(() => {
        if (!data.stage) {
            console.log()
            if (data.participants_number === data.players.length) {
                setStateButtonReadiness(true)
            }
        }
    },[]);

    // const getCardImagePath = (card: string | undefined| null ) => {
    //     if (card){
    //         const [suit] = card.split('_');
    //         const path = new URL(`../../../assets/cards/${suit}/${card}.svg`, import.meta.url).href;
    //         return path;
    //     }else{
    //         console.log('иди в пизду ')
    //     }
    //
    // };
    //
    // const trump_card=currentTable?.trump_card;
    // const angle = 20;
    // const offset = 30;
    // const middle = myCards.length ? Math.floor(myCards.length / 2) : 0;

    if (gameId) {
        return (
            <div className={cls.main}>
                <HeaderPlayGame />
                <MainGame/>
                <FooterPlayGame gameId={gameId} stateButtonReadiness={stateButtonReadiness}/>

            </div>
        );
    } else {
        return (
            <div className={cls.main}>
                Ошибка отсутствие идентификационного номера игры
            </div>
        )
    }
};

export default PlayGame;
