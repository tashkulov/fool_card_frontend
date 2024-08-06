import './play-game.css';
import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../hooks/useAppReduxToolkitTools/redux.ts";
import { RootState } from "../../Providers/StoreProvider/store.ts";
import {joinInGameService} from "./statePlayGame/service/joinInGameService.ts";
import {getPlayers} from "./statePlayGame/service/getPlayers.ts";
import {getCurrentTableThunk} from "./statePlayGame/service/getCurrentTableThunk.ts";
import {getGames} from "./statePlayGame/service/getGames.ts";
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

            console.log(gameId, sessionStorage.getItem("statusPlayer"))

            if (who === "guest") {
                if (sessionStorage.getItem("statusPlayer") != gameId) {
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

    if (gameId && who) {
        return (
            <div className={cls.main}>
                <HeaderPlayGame />
                <MainGame  gameId={gameId}/>
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
