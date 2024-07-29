import './play-game.css';
import card1 from '../img/card1.svg';
import card2 from '../img/card2.svg';
import card3 from '../img/card3.svg';
import GamePlay from "../img/Gameplay_Avatar.svg";
import coins from "../img/coins.svg";
import arrow from "../img/Arrow1.svg";
import { useEffect, useState, useRef } from "react";
import back_card from '../../../assets/cards/back/back_3.svg';
import {Link} from 'react-router-dom';
import { fetchGameData, fetchGameList, placeCardOnTable, beatCard, endTurn } from './apiService'; // Импортируем функции API
import { GameData, GameListItem } from './interface';

const PlayGame = () => {

    // const { gameId } = useParams<{ gameId: string }>();

    const [gameData, setGameData] = useState<GameData | null>(null);
    const [betValue, setBetValue] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const cardAnimationContainerRef = useRef<HTMLDivElement | null>(null);
    const handRef = useRef<HTMLDivElement | null>(null);
    const [myCards, setMyCards] = useState<string[]>([]);
    const [tableCards, setTableCards] = useState<{ card: string, beaten_by_card: string | null }[]>([]);
    const [attackMode, setAttackMode] = useState<boolean>(true);

    const gameId = 41;


    const loadGameData = async () => {
        try {
            const data = await fetchGameData(gameId);
            setGameData(data);
            setMyCards(data.hand);

            // Обновление tableCards, если данные получены из API
            if (data.tableCards) {
                setTableCards(data.tableCards);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching game data:', error);
            setError('Failed to load game data');
            setLoading(false);
        }
    };

    const loadGameList = async () => {
        try {
            const gameList = await fetchGameList();
            const game = gameList.find((game: GameListItem) => game.id === gameId);
            if (game) {
                setBetValue(game.bet_value);
            } else {
                setError('Game not found');
            }
        } catch (error) {
            console.error('Error fetching game list:', error);
            setError('Failed to load game list');
        }
    };

    useEffect(() => {
        const loadGameDataInterval = () => {
            loadGameData();
        };

        loadGameData();
        loadGameList()

        const intervalId = setInterval(loadGameDataInterval, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (selectedCard) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                setIsAnimating(false);
                setSelectedCard(null);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [selectedCard]);

    const getCardImagePath = (card: string) => {
        const [suit] = card.split('_');
        const path = new URL(`../../../assets/cards/${suit}/${card}.svg`, import.meta.url).href;
        return path;
    };

    const endTurnHandler = async () => {
        try {
            await endTurn(gameId);
            setTableCards([]);
        } catch (error) {
            console.error('Error ending turn:', error);
            setError('Failed to end turn');
        }
    };

    const handleCardClick = async (card: string) => {
        if (attackMode) {
            try {
                await placeCardOnTable(gameId, card);

                setSelectedCard(card);
                setIsAnimating(true);

                setTimeout(() => {
                    setIsAnimating(false);
                    setSelectedCard(null);

                    setMyCards(prevCards => prevCards.filter(c => c !== card));
                    setTableCards(prevTableCards => [...prevTableCards, { card, beaten_by_card: null }]);

                    console.log('Updated Table Cards:', [...tableCards, { card, beaten_by_card: null }]);
                    setAttackMode(false);
                }, 500);
            } catch (error) {
                console.error('Error placing card on table:', error);
            }
        } else {
            const cardToBeat = tableCards.find(t => t.beaten_by_card === null)?.card;

            if (cardToBeat) {
                try {
                    await beatCard(gameId, cardToBeat, card);

                    setTableCards(prevTableCards =>
                        prevTableCards.map(t =>
                            t.card === cardToBeat ? { ...t, beaten_by_card: card } : t
                        )
                    );

                    setMyCards(prevCards => prevCards.filter(c => c !== card));

                    console.log(`Card ${cardToBeat} beaten by ${card}`);
                    setAttackMode(true);
                } catch (error) {
                    console.error('Error beating card:', error);
                }
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const angle = 20;
    const offset = 30;
    const middle = gameData ? Math.floor(gameData.hand.length / 2) : 0;

    return (
        <div className="wrapper">
            <div className="plays">
                <section className="play-header">
                    <div className="play-header-wrapper">

                        <div className="play-header-block">
                            <Link to={'/'} className="play-header-back block-obvodka">
                                <img src={arrow} alt="Back" />
                            </Link>

                            <div className="play-header-coin">
                                <img src={coins} alt="Coins" />
                                <p>{betValue !== null ? `${betValue}` : 'N/A'}</p>
                            </div>
                        </div>
                        <div className="play-header-rejim block-obvodka">
                            <img src={card1} alt="Card 1" />
                            <img src={card2} alt="Card 2" />
                            <img src={card3} alt="Card 3" />
                        </div>
                    </div>
                </section>
                <div className="play-header-polosa"></div>
                <div className="play-header-polosa"></div>
            </div>
            <div className="main play-wrapper-game play-krug">
                <div className="main-wrapper-plays">
                    <div className="wrapper-plays-header"></div>
                    <div className="wrapper-plays-game">
                        <div className="players-blocks">
                            <div id="user-dumaet" style={{borderRadius:'50%'}}>
                                <img src={GamePlay} alt="Gameplay Avatar" />
                                <div className="second-player-hand">
                                    {myCards.map((card, index) => {

                                        return (
                                            <img
                                                key={card}
                                                src={back_card}
                                                alt="back_card_second_player"
                                                style={{
                                                    zIndex: index + 1,
                                                    width: 64,
                                                    height: 90
                                                }}
                                            />
                                        );
                                    })}
                                </div>

                            </div>

                            <div className="players-flex">
                                <div className="player-block1 footer-ava-wp1">
                                    <img src={GamePlay} alt="Gameplay Avatar" />
                                </div>
                                <div className="player-block1 footer-ava-wp1">
                                    <img src={GamePlay} alt="Gameplay Avatar" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="deck">
                        <div className="card-container">
                            {gameData && (
                                <img
                                    key={'trump_card'}
                                    src={getCardImagePath(gameData.trump_card)}
                                    alt={"card"}
                                    width={64}
                                    height={90}
                                    className="trump-card"
                                />
                            )}
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
                                    onAnimationEnd={() => {
                                        setIsAnimating(false);
                                        setSelectedCard(null);
                                    }}
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
                        {myCards.map((card: string, index: number) => {
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
                                    onClick={() => handleCardClick(card)}
                                />
                            );
                        })}
                    </div>

                </div>
            </div>

            <div className="play-footer">
                <div className="play-footer-ava">
                    <div className="footer-ava-roga">
                        <div className="footer-ava-wp1">
                            <img src={GamePlay} alt="Gameplay Avatar" />
                        </div>
                    </div>
                </div>
                <div className="play-footer-wrap">
                        <button className="play-footer-btn" onClick={endTurnHandler}>Бито</button>
                </div>
            </div>
        </div>
    );
};

export default PlayGame;
