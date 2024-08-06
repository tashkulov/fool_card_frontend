import './PlayGames.css';
import card1 from "../img/card1.svg";
import card2 from '../img/card2.svg';
import card3 from '../img/card3.svg';
import GamePlay from "../img/Gameplay_Avatar.svg";
import coins from "../img/coins.svg";
import arrow from "../img/Arrow1.svg";
import {useEffect, useRef, useState} from "react";
import back_card from '../../../assets/cards/back/back_3.svg';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../hooks/useAppReduxToolkitTools/redux.ts";
import { RootState } from "../../Providers/StoreProvider/store.ts";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import WaitingForPlayers from "./WaitingRoom/WaitingForPlayers.tsx";
import {toast} from "react-toastify";
import {joinInGameService} from "./statePlayGame/service/joinInGameService.ts";
import {getPlayers} from "./statePlayGame/service/getPlayers.ts";
import {getCurrentTableThunk} from "./statePlayGame/service/getCurrentTableThunk.ts";
import {placeCardOnTableThunk} from "./statePlayGame/service/placeCardOnTableThunk.ts";
// import {beatCardThunk} from "./statePlayGame/service/beatCardThunk.ts";
import {endTurnThunk} from "./statePlayGame/service/endTurnThunk.ts";
import {statePlayGameSliceAction, } from "./statePlayGame";

const PlayGame = () => {
    const dispatch = useAppDispatch();
    const { gameId, who } = useParams<{ gameId: string, who: string }>();
    const [, setSelectedCard] = useState<string | null>(null);
    const [isAnimating, ] = useState(false);

    const { isLoading, tableCards, myCards, attackMode, waiting,currentTable  } = useAppSelector((state: RootState) => state.playGame);
    const cardAnimationContainerRef = useRef<HTMLDivElement | null>(null);
    const handRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (gameId) {
            dispatch(getCurrentTableThunk(Number(gameId)));

            if (who === "guest" || who === "creator") {
                dispatch(joinInGameService(Number(gameId)));
                dispatch(getPlayers(Number(gameId)));
            }
        }
    }, [dispatch, gameId, who]);

    useEffect(() => {
        if (!waiting) {
            const intervalId = setInterval(() => {
                dispatch(getCurrentTableThunk(Number(gameId)));
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [waiting, dispatch, gameId]);

    const handleCardClick = async (card: string,) => {
        if (attackMode) {
            try {
                await dispatch(placeCardOnTableThunk({ gameId: Number(gameId), card }));
                setSelectedCard(card);
            } catch (error) {
                console.error('Error placing card on table:', error);
            }
        } else {
            console.log('hello')
        }
        //     const cardToBeat = tableCards.find(t => t.beaten_by_card === null)?.card;
        //     if (cardToBeat) {
        //         try {
        //             await dispatch(beatCardThunk({ gameId: Number(gameId), cardToBeat, cardToBeatBy }));
        //         } catch (error) {
        //             console.error('Error beating card:', error);
        //         }
        //     }
        // }
    };
    const getCardImagePath = (card: string | undefined| null ) => {
        if (card){
            const [suit] = card.split('_');
            const path = new URL(`../../../assets/cards/${suit}/${card}.svg`, import.meta.url).href;
            return path;
        }else{
            console.log('иди в пизду ')
        }

    };

    const endTurnHandler = async () => {
        if (tableCards.some(card => card.beaten_by_card === null)) {
            toast.error('Необходимо побить все карты на столе, прежде чем завершить ход.');
            return;
        }

        try {
            await dispatch(endTurnThunk(Number(gameId)));
        } catch (error) {
            console.error('Error ending turn:', error);
        }
    };

    const trump_card=currentTable?.trump_card;
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
                    <WaitingForPlayers onReadyClick={() => dispatch(statePlayGameSliceAction.setWaiting(false))}/>
                ) : (
                    <div className="main-wrapper-plays">
                        <div className="players-blocks">
                            <div id="user-dumaet" style={{borderRadius: '50%'}}>
                                <CountdownCircleTimer
                                    isPlaying
                                    duration={30}
                                    size={90}
                                    colors={['#18ee7b', '#80776DFF']}
                                    colorsTime={[30, 0]}
                                >
                                    {({}) => <img src={GamePlay} alt="Gameplay Avatar"/>}
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
                            <div className="players-flex">
                                <div className="player-block1 footer-ava-wp1">
                                    <img src={GamePlay} alt="Gameplay Avatar"/>
                                </div>
                                <div className="player-block1 footer-ava-wp1">
                                    <img src={GamePlay} alt="Gameplay Avatar"/>
                                </div>
                            </div>
                        </div>
                        <div className="deck">
                            <div className="card-container">
                                {/*<img*/}
                                {/*    key={'trump_card'}*/}
                                {/*    src={getCardImagePath(trump_card)}*/}
                                {/*    alt={"card"}*/}
                                {/*    width={64}*/}
                                {/*    height={90}*/}
                                {/*    className="trump-card"*/}
                                {/*/>*/}
                                <img
                                    key={'back_card_in_deck'}
                                    src={back_card}
                                    alt={"back_card_in_deck"}
                                    width={64}
                                    height={90}
                                    className="back-card-in-deck"
                                />
                            </div>
                        </div>
                        <div className="bita">
                            <div className="card-container">
                                <img
                                    key={'bita1'}
                                    src={back_card}
                                    alt={"back_card"}
                                    width={64}
                                    height={90}
                                    className="back_card1"
                                />
                                <img
                                    key={'bita2'}
                                    src={back_card}
                                    alt={"back_card"}
                                    width={64}
                                    height={90}
                                    className="back_card2"
                                />
                                <img
                                    key={'bita3'}
                                    src={back_card}
                                    alt={"back_card"}
                                    width={64}
                                    height={90}
                                    className="back_card3"
                                />
                            </div>
                        </div>
                        <div className="table-card" ref={cardAnimationContainerRef}>
                            {tableCards.map(({ card, beaten_by_card }, index) => (
                                <div key={index} className="table-card-item">
                                    <img
                                        src={getCardImagePath(card)}
                                        alt={card}
                                        className={`bita-card ${isAnimating ? 'animate' : ''}`}
                                    />
                                    {beaten_by_card && (
                                        <img
                                            src={getCardImagePath(beaten_by_card)}
                                            alt={beaten_by_card}
                                            className="beaten-card"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="hand" ref={handRef}>
                            {currentTable.hand.map((card: string, index: number) => {
                                const rotation = (index - middle) * angle;
                                const position = (index - middle) * offset;

                                return (
                                    <img
                                        key={card}
                                        src={getCardImagePath(card)}
                                        alt={card}
                                        style={{
                                            left: `calc(50% + ${position}px)`,
                                            transform: `rotate(${rotation}deg)`,
                                            transition: 'transform 0.2s ease',
                                            zIndex: 10,
                                        }}
                                        onClick={() => handleCardClick(card,)}
                                    />
                                );
                            })}
                        </div>
                        <button
                            className="btn-end-turn"
                            onClick={endTurnHandler}
                        >
                            Завершить ход
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlayGame;
