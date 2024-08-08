import cls from "./MainGame.module.scss";
import ava from "../../images/Сircle Right.svg";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useAppReduxToolkitTools/redux.ts";
import { RootState } from "../../../../Providers/StoreProvider/store.ts";
import { useEffect, useState } from "react";
import { getCurrentTableThunk } from "../../statePlayGame/service/getCurrentTableThunk.ts";
import { getCardImagePath } from "./components/getCardImagePath/getCardImagePath.ts";
import back_card from '../../../../../assets/cards/back/back_2.svg';
import { calculateCardStyles, calculateCardStylesForOpponent } from "./components/calculateCardStyles/calculateCardStyles.ts";
import { placeCardOnTableThunk } from "../../statePlayGame/service/placeCardOnTableThunk.ts";
import { beatCardThunk } from "../../statePlayGame/service/beatCardThunk.ts";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

type TMainGameProps = {
    gameId: string;
};

const MainGame = (props: TMainGameProps) => {
    const dispatch = useAppDispatch();
    const { gameId } = props;
    const data = useAppSelector((state: RootState) => state.playGame);
    const [movingCard, setMovingCard] = useState<string | null>(null);
    const [currentTurn, setCurrentTurn] = useState<string>('creator');
    const [key, setKey] = useState<number>(0);

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
            setTimeout(() => {
                setMovingCard(null);
            }, 500);
        }
    }, [movingCard]);

    const table = data.currentTable?.table ?? [];
    const playerHand = data.currentTable?.hand ?? [];
    const idPlayers = Object.keys(data.currentTable?.participants ?? {});
    const opponentCardsAmount = idPlayers.length > 0 ? data.currentTable?.participants[idPlayers[0]]?.cards_amount ?? 0 : 0;
    const opponentCards = new Array(opponentCardsAmount).fill('back_card');

    const handleBeatCard = (cardToBeatBy: string) => {
        const lastCard = table[table.length - 1];
        if (lastCard && !lastCard.beaten_by_card) {
            dispatch(beatCardThunk({ gameId: Number(gameId), cardToBeat: lastCard.card, cardToBeatBy }));
            setCurrentTurn('guest');
            setKey(prevKey => prevKey + 1);
        }
    };

    const handleCardClick = (card: string) => {
        const lastCard = table[table.length - 1];
        if (lastCard && !lastCard.beaten_by_card) {
            handleBeatCard(card);
        } else {
            setMovingCard(card);
            dispatch(placeCardOnTableThunk({ gameId: Number(gameId), card }));
            setCurrentTurn('guest');
            setKey(prevKey => prevKey + 1);
        }
    };

    const onComplete = () => {
        if (currentTurn === 'creator') {
            setCurrentTurn('guest');
        } else {
            setCurrentTurn('creator');
        }
        setKey(prevKey => prevKey + 1);
    };

    return (
        <div className={cls.main}>
            <div className={cls.wrapperImg}>
                <CountdownCircleTimer
                    key={key} // Использование ключа для обновления таймера
                    isPlaying={currentTurn === 'guest'}
                    duration={30}
                    size={96}
                    colors={['#18ee7b', '#80776DFF']}
                    colorsTime={[30, 0]}
                    onComplete={onComplete}
                >
                    {() => <img src={ava} className={cls.opponentAva} alt="avatars players" />}
                </CountdownCircleTimer>
                <div className={cls.wrapperTextGetReady}>
                    Нажми Готов
                </div>
            </div>
            <div className={cls.opponentHand}>
                {opponentCards.map((_, index: number) => (
                    <img
                        key={index}
                        src={back_card}
                        alt="back_card"
                        className={cls.card}
                        style={calculateCardStylesForOpponent(index, opponentCards.length)}
                    />
                ))}
            </div>
            <div className={cls.hand}>
                {playerHand.map((card: string, index: number) => (
                    <img
                        key={index}
                        src={getCardImagePath(card)}
                        alt={card}
                        className={`${cls.card} ${movingCard === card ? cls.cardMoving : ''}`}
                        style={calculateCardStyles(index, playerHand.length)}
                        onClick={() => currentTurn === 'creator' && handleCardClick(card)}
                    />
                ))}
            </div>
            <div className={cls.MywrapperImg}>
                <CountdownCircleTimer
                    key={key} // Использование ключа для обновления таймера
                    isPlaying={currentTurn === 'creator'}
                    duration={30}
                    size={96}
                    colors={['#18ee7b', '#80776DFF']}
                    colorsTime={[30, 0]}
                    onComplete={onComplete}
                >
                    {() => <img src={ava} alt="avatars players" />}
                </CountdownCircleTimer>
                <div className={cls.wrapperTextGetReady}></div>
            </div>
            <div className={cls.bita}>
                <div className={cls.cardContainer}>
                    <img
                        key={'bita1'}
                        src={back_card}
                        alt={"back_card"}
                        width={64}
                        height={90}
                        className={cls.back_card1}
                    />
                    <img
                        key={'bita2'}
                        src={back_card}
                        alt={"back_card"}
                        width={64}
                        height={90}
                        className={cls.back_card2}
                    />
                    <img
                        key={'bita3'}
                        src={back_card}
                        alt={"back_card"}
                        width={64}
                        height={90}
                        className={cls.back_card3}
                    />
                </div>
            </div>
            <div className={cls.deck}>
                <img src={getCardImagePath(data.currentTable?.trump_card)} alt="trump_card" className={cls.trump} />
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
