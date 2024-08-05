// src/components/PlayGame.tsx
import './play-game.css';
import card1 from "../img/card1.svg";
import card2 from '../img/card2.svg';
import card3 from '../img/card3.svg';
import GamePlay from "../img/Gameplay_Avatar.svg";
import coins from "../img/coins.svg";
import arrow from "../img/Arrow1.svg";
import { useEffect, useState } from "react";
import back_card from '../../../assets/cards/back/back_3.svg';
import { Link, useParams } from 'react-router-dom';
import {

    usePlaceCardOnTableMutation,
    useBeatCardMutation,
    useEndTurnMutation,
    useFetchGameDataQuery,
    useMarkPlayerReadyMutation
} from './apiService';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import WaitingForPlayers from "./WaitingRoom/WaitingForPlayers.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppReduxToolkitTools/redux.ts";
import { RootState } from "../../Providers/StoreProvider/store.ts";
import {
    beatCardThunk,
    endTurnThunk, markPlayerReadyThunk,
    placeCardOnTableThunk,
    setAttackMode,
    setMyCards,
    setTableCards, setWaiting
} from "./playGameSlice.ts";
const PlayGame = () => {
    const dispatch = useAppDispatch();
    const statePlayGame = useAppSelector((state: RootState) => state.playGame);
    const { gameId } = useParams<{ gameId: string }>();

    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [placeCardOnTable] = usePlaceCardOnTableMutation();
    const [beatCard] = useBeatCardMutation();
    const [endTurn] = useEndTurnMutation();
    const [markPlayerReady] = useMarkPlayerReadyMutation();

    const { data: gameData, error: fetchGameDataError, refetch: refetchGameData } = useFetchGameDataQuery(gameId || '', { skip: !gameId });

    useEffect(() => {
        if (gameData) {
            dispatch(setMyCards(gameData.hand));
            dispatch(setTableCards(gameData.tableCards || []));
        }
    }, [gameData, dispatch]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            refetchGameData();
        }, 1000);
        return () => clearInterval(intervalId);
    }, [refetchGameData]);

    const endTurnHandler = async () => {
        if (hasUnbeatenCards()) {
            toast.error('Необходимо побить все карты на столе, прежде чем завершить ход.');
            return;
        }

        try {
            await dispatch(endTurnThunk(gameId)).unwrap();
            dispatch(setTableCards([]));
        } catch (error) {
            console.error('Error ending turn:', error);
            setError('Failed to end turn');
        }
    };

    const handleCardClick = async (card: string) => {
        if (attackMode) {
            try {
                await dispatch(placeCardOnTableThunk({ gameId, card })).unwrap();
                setSelectedCard(card);
                setIsAnimating(true);
                setTimeout(() => {
                    setIsAnimating(false);
                    setSelectedCard(null);
                    dispatch(setMyCards(myCards.filter(c => c !== card)));
                    dispatch(setTableCards([...tableCards, { card, beaten_by_card: null }]));
                    dispatch(setAttackMode(false));
                }, 500);
            } catch (error) {
                console.error('Error placing card on table:', error);
            }
        } else {
            const cardToBeat = tableCards.find(t => t.beaten_by_card === null)?.card;

            if (cardToBeat) {
                try {
                    await dispatch(beatCardThunk({ gameId, cardToBeat, card })).unwrap();
                    dispatch(setTableCards(
                        tableCards.map(t =>
                            t.card === cardToBeat ? { ...t, beaten_by_card: card } : t
                        )
                    ));
                    dispatch(setMyCards(myCards.filter(c => c !== card)));
                    dispatch(setAttackMode(true));
                } catch (error) {
                    console.error('Error beating card:', error);
                }
            }
        }
    };

    const hasUnbeatenCards = () => tableCards.some(card => card.beaten_by_card === null);

    const handleReadyClick = async () => {
        try {
            await dispatch(markPlayerReadyThunk(gameId)).unwrap();
            dispatch(setWaiting(false));
        } catch (error) {
            console.error('Ошибка при отметке игрока как готового:', error);
            setError('Не удалось отметить игрока как готового');
        }
    };
    if (fetchGameDataError) return <div>{`Ошибка при получении данных игры: ${fetchGameDataError.message}`}</div>;
    if (error) return <div>{error}</div>;

    const angle = 20;
    const offset = 30;
    const middle = myCards.length ? Math.floor(myCards.length / 2) : 0;

    return (
        <div className="wrapper">
            <div className="plays">
                <section className="play-header">
                    <div className="play-header-wrapper">
                        <div className="play-header-block">
                            <Link to={'/'} className="play-header-back block-obvodka">
                                <img src={arrow} alt="Back"/>
                            </Link>
                            <div className="play-header-coin">
                                <img src={coins} alt="Coins"/>
                            </div>
                        </div>
                        <div className="play-header-rejim block-obvodka">
                            <img src={card1} alt="Card 1"/>
                            <img src={card2} alt="Card 2"/>
                            <img src={card3} alt="Card 3"/>
                        </div>
                    </div>
                </section>
                <div className="play-header-polosa"></div>
                <div className="play-header-polosa"></div>
            </div>
            <div className="main play-wrapper-game play-krug">
                {waiting ? (
                    <WaitingForPlayers onReadyClick={handleReadyClick}/>
                ) : (
                    <div className="main-wrapper-plays">
                        <div className="wrapper-plays-header"></div>
                        <div className="wrapper-plays-game">
                            <div className="players-blocks">
                                <div id="user-dumaet" style={{ borderRadius: '50%' }}>
                                    <CountdownCircleTimer
                                        isPlaying
                                        duration={30}
                                        size={90}
                                        colors={['#18ee7b', '#80776DFF']}
                                        colorsTime={[30, 0]}
                                    >
                                        {() => <img src={GamePlay} alt="Gameplay Avatar"/>}
                                    </CountdownCircleTimer>
                                    <div className="second-player-hand">
                                        {myCards.map((card, index) => (
                                            <img
                                                key={card}
                                                src={back_card}
                                                alt="back_card_second_player"
                                                style={{
                                                    zIndex: index + 1,
                                                    width: 64,
                                                    height: 90,
                                                    transition: 'opacity 0.3s ease',
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="play-area">
                                    <div
                                        ref={cardAnimationContainerRef}
                                        className={`card-animation-container ${isAnimating ? 'animating' : ''}`}
                                    >
                                        {tableCards.map(({ card, beaten_by_card }) => (
                                            <div key={card} className={`card-container ${beaten_by_card ? 'beaten' : ''}`}>
                                                <img src={getCardImagePath(card)} alt={card} className="card-image"/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="play-table">
                                <div
                                    ref={handRef}
                                    className="play-table-hand"
                                    style={{ display: 'flex', flexDirection: 'row' }}
                                >
                                    {myCards.map((card) => (
                                        <div
                                            key={card}
                                            className={`card ${selectedCard === card ? 'selected' : ''}`}
                                            onClick={() => handleCardClick(card)}
                                        >
                                            <img src={getCardImagePath(card)} alt={card} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlayGame;
