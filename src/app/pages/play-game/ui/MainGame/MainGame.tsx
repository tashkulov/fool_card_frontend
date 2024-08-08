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
import img from '../../../../../assets/cards/cl/cl_11.svg'

type TMainGameProps = {
    gameId: string;
};

const MainGame = (props: TMainGameProps) => {
    const dispatch = useAppDispatch();
    const { gameId } = props;
    const data = useAppSelector((state: RootState) => state.playGame);

    const [activeCardId, setActiveCardId] = useState<string | null>(null);
    const [cardPositions, setCardPositions] = useState<Record<string, { x: number; y: number }>>({});
    const [offsets, setOffsets] = useState<Record<string, { x: number; y: number }>>({});
    const [isDragging, setIsDragging] = useState(false);
    const [draggingCardScale, setDraggingCardScale] = useState<Record<string, { scale: number }>>({});

    const handleMouseDown = (id: string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
        }))
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isDragging && activeCardId) {
            setCardPositions((prevPositions) => ({
                ...prevPositions,
                [activeCardId]: {
                    x: event.clientX - (offsets[activeCardId]?.x ?? 0),
                    y: event.clientY - (offsets[activeCardId]?.y ?? 0),
                },
            }));
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setActiveCardId(null);
        handleCardClick(activeCardId)
    };

    const handleTouchStart = (id: string, event: React.TouchEvent<HTMLDivElement>) => {
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
        // handleCardClick(id);


        setDraggingCardScale((prevScale) => ({
            ...prevScale,
            [id]: {
                scale: 1.4
            }
        }))

    };

    const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
        if (isDragging && activeCardId) {
            const touch = event.touches[0];
            setCardPositions((prevPositions) => ({
                ...prevPositions,
                [activeCardId]: {
                    x: touch.clientX - (offsets[activeCardId]?.x ?? 0),
                    y: touch.clientY - (offsets[activeCardId]?.y ?? 0),
                },
            }));
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);

        handleCardClick(activeCardId)
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

    const table = data.currentTable?.table ?? [];
    const playerHand = data.currentTable?.hand ?? [];
    const idPlayers = Object.keys(data.currentTable?.participants ?? {});
    const opponentCardsAmount = idPlayers.length > 0 ? data.currentTable?.participants[idPlayers[0]]?.cards_amount ?? 0 : 0;
    const opponentCards = new Array(opponentCardsAmount).fill('back_card');

    const handleBeatCard = (cardToBeatBy: string) => {
        const lastCard = table[table.length - 1];
        if (lastCard && !lastCard.beaten_by_card) {
            dispatch(beatCardThunk({ gameId: Number(gameId), cardToBeat: lastCard.card, cardToBeatBy }));
        }
    };

    const handleCardClick = (card: string | null) => {
        const lastCard = table[table.length - 1];
        if (card === null) {
            return;
        }

        if (lastCard && !lastCard.beaten_by_card) {
            handleBeatCard(card);
        } else {
            dispatch(placeCardOnTableThunk({ gameId: Number(gameId), card }));
        }

        
    };

    return (
        <div className={cls.main}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
        >

            {/* <div
                className="bebebe"
                onMouseDown={(event) => handleMouseDown('card1', event)}
                onTouchStart={(event) => handleTouchStart('card1', event)}
                style={{
                    width: '30%',
                    height: '30%',
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'absolute',
                    left: `${cardPositions['card1']?.x ?? 0}px`,
                    top: `${cardPositions['card1']?.y ?? 0}px`,
                    cursor: 'grab',
                }}
            /> */}

            <div className={cls.wrapperImg}>
                <img src={ava} alt="avatars players" />
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
                    />
                ))}
            </div>
            <div className={cls.MywrapperImg}>
                <img src={ava} alt="avatars players" />
                <div className={cls.wrapperTextGetReady}>
                </div>
            </div>
            <div className={cls.deck}>
                <img src={getCardImagePath(data.currentTable?.trump_card)} alt="trump_card" className={cls.trump} />
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
                            src={getCardImagePath(cardObj.card)}
                            alt={cardObj.card}
                        />
                        {cardObj.beaten_by_card ? (
                            <img
                                src={getCardImagePath(cardObj.beaten_by_card)}
                                alt={cardObj.beaten_by_card}
                                className={cls.beatenByCard}
                                style={{
                                    marginTop: '20px'
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