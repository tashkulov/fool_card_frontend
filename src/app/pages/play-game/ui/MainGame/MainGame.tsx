import ava from "../../images/Сircle Right.svg";
import React, { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useAppReduxToolkitTools/redux";
import { RootState } from "../../../../Providers/StoreProvider/store";
import { getCurrentTableThunk } from "../../statePlayGame/service/getCurrentTableThunk";
import back_card from "../../../../../assets/cards/back/back_2.svg";
import { getMyRotateStyle, getMyTranslateXStyle,
    getRotateStyle, getTranslateXStyle
} from "./components/calculateCardStyles/calculateCardStyles";
import { placeCardOnTableThunk } from "../../statePlayGame/service/placeCardOnTableThunk";
import { beatCardThunk } from "../../statePlayGame/service/beatCardThunk";
import Card from "./ui/Card";
import cls from "./MainGame.module.scss";
import {getCardImagePath} from "./components/getCardImagePath/getCardImagePath.ts";

type TMainGameProps = {
    gameId: string;
};

const MainGame: React.FC<TMainGameProps> = ({ gameId }) => {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state: RootState) => state.playGame);
    const [activeCardIndex, setActiveCardIndex] = useState<number>(-1);
    const [activeOpponentCardIndex, setActiveOpponentCardIndex] = useState<number>(-1);
    const [movingCard, setMovingCard] = useState<string | null>(null);

    useEffect(() => {
        const fetchTableData = () => {
            dispatch(getCurrentTableThunk(Number(gameId)));
        };

        fetchTableData();
        const interval = setInterval(fetchTableData, 5000);

        return () => clearInterval(interval);
    }, [dispatch, gameId]);

    useEffect(() => {
        if (movingCard) {
            const timeout = setTimeout(() => {
                setMovingCard(null);
            }, 500);

            return () => clearTimeout(timeout);
        }
    }, [movingCard]);

    const table = data.currentTable?.table ?? [];
    const playerHand = data.currentTable?.hand ?? [];
    const idPlayers = Object.keys(data.currentTable?.participants ?? {});
    const opponentCardsAmount = idPlayers.length > 0 ? data.currentTable?.participants[idPlayers[0]]?.cards_amount ?? 0 : 0;
    const opponentCards = new Array(opponentCardsAmount).fill('back_card');

    const handleBeatCard = useCallback((cardToBeatBy: string) => {
        const lastCard = table[table.length - 1];
        if (lastCard && !lastCard.beaten_by_card) {
            dispatch(beatCardThunk({ gameId: Number(gameId), cardToBeat: lastCard.card, cardToBeatBy }));
        }
    }, [dispatch, gameId, table]);

    const handleCardClick = useCallback((card: string) => {
        const lastCard = table[table.length - 1];
        if (lastCard && !lastCard.beaten_by_card) {
            handleBeatCard(card);
        } else {
            setMovingCard(card);
            dispatch(placeCardOnTableThunk({ gameId: Number(gameId), card }));
        }
    }, [dispatch, gameId, table, handleBeatCard]);

    useEffect(() => {
        if (playerHand.length > 0) {
            const interval = setInterval(() => {
                setActiveCardIndex((prevIndex) => {
                    if (prevIndex < playerHand.length - 1) {
                        return prevIndex + 1;
                    } else {
                        clearInterval(interval);
                        return prevIndex;
                    }
                });
            }, 500);

            return () => clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        if (opponentCards.length > 0) {
            const interval = setInterval(() => {
                setActiveOpponentCardIndex((prevIndex) => {
                    if (prevIndex < opponentCards.length - 1) {
                        return prevIndex + 1;
                    } else {
                        clearInterval(interval);
                        return prevIndex;
                    }
                });
            }, 500);

            return () => clearInterval(interval);
        }
    }, [opponentCards.length]);

    useEffect(() => {
        console.log(playerHand)
    }, [playerHand]);

    useEffect(() => {
        console.log(opponentCards)
    }, [opponentCards]);



    return (
        <div className={cls.main}>
            <div className={cls.wrapperImg}>
                <img src={ava} alt="avatars players" />
                <div className={cls.wrapperTextGetReady}>
                    Нажми Готов
                </div>
            </div>
            <div className={cls.opponentHand}>
                {opponentCards.map((_, index: number) => (
                    index <= activeOpponentCardIndex && (
                        <Card
                            Top={0}
                            key={index}
                            src={back_card}
                            alt="back_card"
                            Rotate={getRotateStyle(index, opponentCards.length)}
                            Transform={getTranslateXStyle(index, opponentCards.length)}
                        />
                    )
                ))}
            </div>
            <div className={cls.hand}>
                {playerHand.map((card: string, index: number) => (
                    index <= activeCardIndex && (
                        <Card
                            Top={0}
                            key={index}
                            src={getCardImagePath(card)}
                            alt="card"
                            Rotate={getMyRotateStyle(index, playerHand.length)}
                            Transform={getMyTranslateXStyle(index, playerHand.length)}
                            onClick={() => handleCardClick(card)}
                        />
                    )
                ))}
            </div>
            <div className={cls.MywrapperImg}>
                <img src={ava} alt="avatars players" />
                <div className={cls.wrapperTextGetReady}>
                </div>
            </div>
            <div className={cls.deck}>
                <img src={getCardImagePath(data.currentTable?.trump_card+"")} alt="trump_card" className={cls.trump} />
                <img src={back_card} alt="deck_card" />
            </div>
            <div className={cls.tableCard}>
                {table.map((cardObj, index: number) => (
                    <div key={index}>
                        <img
                            src={getCardImagePath(cardObj.card)}
                            alt={cardObj.card}
                        />

                        {cardObj.beaten_by_card ? (
                            <img
                                src={getCardImagePath(cardObj.beaten_by_card)}
                                alt={cardObj.beaten_by_card}
                                className={cls.beatenCard}
                            />
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainGame;
