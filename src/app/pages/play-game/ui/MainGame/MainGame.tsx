import ava from "../../images/Сircle Right.svg";
import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useAppReduxToolkitTools/redux";
import { RootState } from "../../../../Providers/StoreProvider/store";
import { getCurrentTableThunk } from "../../statePlayGame/service/getCurrentTableThunk";
import back_card from "../../../../../assets/cards/back/back_2.svg";
import {
    calculateCardStyles,
    getRotateStyle,
    getTranslateXStyle
} from "./components/calculateCardStyles/calculateCardStyles";
import { placeCardOnTableThunk } from "../../statePlayGame/service/placeCardOnTableThunk";
import { beatCardThunk } from "../../statePlayGame/service/beatCardThunk";
import Card from "./ui/Card";
import cls from "./MainGame.module.scss";
import { getCardImagePath } from "./components/getCardImagePath/getCardImagePath";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { stopAnimation } from "../../statePlayGame/slice/statePlayGameSlice";
import { endTurnThunk } from "../../statePlayGame/service/endTurnThunk";

type TMainGameProps = {
    gameId: string;
};

const MainGame: React.FC<TMainGameProps> = ({ gameId }) => {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state: RootState) => state.playGame);
    const [activeCardIndex, setActiveCardIndex] = useState<number>(-1);
    const [activeOpponentCardIndex, setActiveOpponentCardIndex] = useState<number>(-1);
    const [movingCard, setMovingCard] = useState<string | null>(null);
    const [currentTurn, setCurrentTurn] = useState<string>('creator');
    const [key, setKey] = useState<number>(0);
    const [activeCardId, setActiveCardId] = useState<string | null>(null);
    const [cardPositions, setCardPositions] = useState<Record<string, { x: number; y: number }>>({});
    const [offsets, setOffsets] = useState<Record<string, { x: number; y: number }>>({});
    const [isDragging, setIsDragging] = useState(false);
    const [draggingCardScale, setDraggingCardScale] = useState<Record<string, { scale: number }>>({});

    const [rotationAngle, setRotationAngle] = useState<Record<string, { angle: number }>>({});

    // const [cardToBeat, setCardToBeat] = useState<string | null>('');


    const isAnimating = useAppSelector((state: RootState) => state.playGame.isAnimating);


    useEffect(() => {
        if (isAnimating) {
            const moveToRightAnimation = async () => {
                // Запуск анимации
                await new Promise(resolve => setTimeout(resolve, 500)); // Ждем 500ms для завершения анимации
                dispatch(stopAnimation()); // Останавливаем анимацию
                dispatch(endTurnThunk(Number(gameId))); // Завершаем ход
                console.log(rotationAngle)
            };
            moveToRightAnimation();
        }
    }, [isAnimating, dispatch, gameId]);


    // const checkCardIntersection = (
    //     cardPosition: { x: number, y: number },
    //     tableCardElement: HTMLElement
    // ): boolean => {
    //     const rect = tableCardElement.getBoundingClientRect();
    //     const cardWidth = 75; // ширина карты
    //     const cardHeight = 105.5; // высота карты

    //     return (
    //         // cardPosition.x < rect.right &&
    //         // cardPosition.x + cardWidth > rect.left &&
    //         // cardPosition.y < rect.bottom &&
    //         // cardPosition.y + cardHeight > rect.top

    //         cardPosition.x < 100
    //     );
    // };

    const getRandomValue = () => {
        return Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    };

    const handleMouseDown = (id: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (currentTurn !== 'creator') return; // Не разрешаем перетаскивание, если это не ваш ход

        setActiveCardId(id);
        setIsDragging(true);
        setOffsets((prevOffsets) => ({
            ...prevOffsets,
            [id]: {
                x: event.clientX - (cardPositions[id]?.x ?? 0),
                y: event.clientY - (cardPositions[id]?.y ?? 0),
            },
        }));

        setDraggingCardScale((prevScale) => ({
            ...prevScale,
            [id]: {
                scale: 1.4
            }
        }));
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isDragging && activeCardId) {
            const newCardPosition = {
                x: event.clientX - (offsets[activeCardId]?.x ?? 0),
                y: event.clientY - (offsets[activeCardId]?.y ?? 0),
            };

            setCardPositions((prevPositions) => ({
                ...prevPositions,
                [activeCardId]: newCardPosition,
            }));

            // Проверка пересечения с картами на столе
            // table.forEach((cardObj) => {
            //     const tableCardElement = document.getElementById(`${cardObj.card}`);

            //     if (tableCardElement) {
            //         console.log(checkCardIntersection(newCardPosition, tableCardElement))
            //         const rect = tableCardElement.getBoundingClientRect()
            //         console.log(re)
            //     }

            //     if (tableCardElement && checkCardIntersection(newCardPosition, tableCardElement)) {
            //         console.log('start');
            //     }
            // });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setActiveCardId(null);
        handleCardClick(activeCardId)

        if (activeCardId != null) {
            setRotationAngle(() => ({

                [activeCardId]: {
                    angle: getRandomValue()
                }
            }));
        }
        setActiveCardId(null);
    };

    const handleTouchStart = (id: string, event: React.TouchEvent<HTMLDivElement>) => {
        if (currentTurn !== 'creator') return; // Не разрешаем перетаскивание, если это не ваш ход

        const touch = event.touches[0];
        setActiveCardId(id);
        setIsDragging(true);
        setOffsets((prevOffsets) => ({
            ...prevOffsets,
            [id]: {
                x: touch.clientX - (cardPositions[id]?.x ?? 0),
                y: touch.clientY - (cardPositions[id]?.y ?? 0),
            },
        }));

        setDraggingCardScale((prevScale) => ({
            ...prevScale,
            [id]: {
                scale: 1.4
            }
        }));
    };

    const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
        if (isDragging && activeCardId) {
            const touch = event.touches[0];
            const newCardPosition = {
                x: touch.clientX - (offsets[activeCardId]?.x ?? 0),
                y: touch.clientY - (offsets[activeCardId]?.y ?? 0),
            };

            setCardPositions((prevPositions) => ({
                ...prevPositions,
                [activeCardId]: newCardPosition,
            }));


            // Проверка пересечения с картами на столе
            // table.forEach((cardObj) => {
            //     const tableCardElement = document.getElementById(`${cardObj.card}`);
            //     // if (tableCardElement) {
            //     //     console.log(checkCardIntersection(newCardPosition, tableCardElement))
            //     // }
            //     if (tableCardElement && checkCardIntersection(newCardPosition, tableCardElement)) {
            //         console.log('start');
            //     }
            // });
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        handleCardClick(activeCardId)
        setActiveCardId(null);

        if (activeCardId != null) {
            setRotationAngle(() => ({

                [activeCardId]: {
                    angle: getRandomValue()
                }
            }));
        }
        setActiveCardId(null);
    };

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

            dispatch(beatCardThunk({ gameId: Number(gameId), cardToBeat: lastCard.card, cardToBeatBy }))

        }
    }, [dispatch, gameId, table]);

    const handleCardClick = (card: string | null) => {
        console.log(card);
        const lastCard = table[table.length - 1];
        if (card === null) {
            return;
        }
        if (currentTurn === 'creator') {
            if (lastCard && !lastCard.beaten_by_card) {
                if (Number((lastCard.card).split('_')[1]) < Number((card).split('_')[1])) {
                    if ((lastCard.card).split('_')[0] === (card).split('_')[0]) {
                        handleBeatCard(card);
                    } else {
                        setMovingCard(card);
                        dispatch(placeCardOnTableThunk({ gameId: Number(gameId), card }));
                        setCurrentTurn('guest');
                        setKey(prevKey => prevKey + 1);
                    }
                }


            } else {
                setMovingCard(card);
                dispatch(placeCardOnTableThunk({ gameId: Number(gameId), card }));
                setCurrentTurn('guest');
                setKey(prevKey => prevKey + 1);
            }

        }
    };


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
    }, [playerHand.length]);

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

    const onComplete = () => {
        if (currentTurn === 'creator') {
            setCurrentTurn('guest');
        } else {
            setCurrentTurn('creator');
        }
        setKey(prevKey => prevKey + 1);
    };


    console.log(``)

    return (
        <div className={cls.main}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className={cls.wrapperImg}>
                <CountdownCircleTimer
                    key={key}
                    isPlaying={currentTurn === 'guest'}
                    duration={10}

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
                        <div
                            key={card} // Убедитесь, что у вас уникальные ключи
                            onMouseDown={(event) => handleMouseDown(card, event)}
                            onTouchStart={(event) => handleTouchStart(card, event)}

                            style={{
                                ...calculateCardStyles(index, playerHand.length),

                                width: '75px',
                                height: '105.5px',
                                backgroundImage: `url(${getCardImagePath(card)})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                position: 'absolute',

                                left: `${cardPositions[card]?.x ?? 0}px`,
                                top: `${cardPositions[card]?.y ?? 0}px`,
                                scale: `${draggingCardScale[card]?.scale}`,
                                cursor: 'grab',
                            }}

                        // onClick={() => currentTurn === 'creator' && handleCardClick(card)}

                        />
                    )))}
            </div>
            <div className={cls.MywrapperImg}>
                <CountdownCircleTimer
                    key={key}
                    isPlaying={currentTurn === 'creator'}
                    duration={10}

                    size={96}
                    colors={['#18ee7b', '#80776DFF']}
                    colorsTime={[30, 0]}
                    onComplete={onComplete}
                >
                    {() => <img src={ava} className={cls.opponentAva} alt="avatars players" />}
                </CountdownCircleTimer>
                <div className={cls.wrapperTextGetReady}>
                </div>
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
                <h1 className={cls.freecards}>{data.currentTable?.free_cards_amount}</h1>
                <img src={getCardImagePath(data.currentTable?.trump_card ?? "")} alt="trump_card"
                    className={cls.trump} />
                <img src={back_card} alt="deck_card" />
            </div>
            <div className={cls.tableCard}>
                {table.map((cardObj, index: number) => (
                    <div
                        key={index}
                        style={{
                            width: '70px',
                            height: '80px',
                        }}
                    >
                        <img
                            id={cardObj.card}
                            src={getCardImagePath(cardObj.card)}
                            alt={cardObj.card}
                        />
                        {cardObj.beaten_by_card ? (
                            <img
                                src={getCardImagePath(cardObj.beaten_by_card)}
                                alt={cardObj.beaten_by_card}
                                className={cls.beatenByCard}
                                style={{
                                    marginTop: '20px',

                                    transform: `rotate(15deg)`

                                }}
                            />
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainGame;
