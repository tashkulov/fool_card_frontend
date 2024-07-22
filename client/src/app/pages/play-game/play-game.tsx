import React, { useState, useEffect } from 'react';
import { animated } from '@react-spring/web';
import './play-game.css';
import back_card from '../../../assets/cards/back/back_2.svg';

interface GameData {
    table: Array<{
        card: string;
        beaten_by_card: string | null;
        participant_threw_by_id: number | null;
        participant_threw_to_id: number;
    }>;
    free_cards_amount: number;
    trump: string;
    trump_card: string;
    hand: string[];
    participants: object;
}

const PlayGame: React.FC = () => {
    const [gameData, setGameData] = useState<GameData | null>(null);
    const [showCards, setShowCards] = useState<boolean>(false);
    const [error, ] = useState<string | null>(null);
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [cardAnimation, setCardAnimation] = useState<string[]>([]);
    const [movingCard, ] = useState<string | null>(null);
    const [movingCardStyle, setMovingCardStyle] = useState({});
    const [tableCards, setTableCards] = useState<string[]>([]);
    const [cardOnTable, setCardOnTable] = useState<string | null>(null);
    const [beatenCards, setBeatenCards] = useState<string[]>([]);
    const [zIndex, setZIndex] = useState<string | null>(null);

    useEffect(() => {
        const mockData: GameData = {
            table: [],
            free_cards_amount: 24,
            trump: 'sp',
            trump_card: 'sp_14',
            hand: ['cl_10', 'dm_8', 'ht_14', 'dm_13', 'sp_13', 'cl_14'],
            participants: {},
        };

        setGameData(mockData);
        const cardsOnTable = mockData.table.map(cardObj => cardObj.card);
        setTableCards(cardsOnTable);
    }, []);

    useEffect(() => {
        if (showCards && gameData) {
            setCardAnimation(gameData.hand);
        }
    }, [showCards, gameData]);

    useEffect(() => {
        if (movingCard) {
            setMovingCardStyle({
                transform: 'translate(-50%, -50%) scale(1.2)',
                zIndex: 10,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transition: 'transform 0.5s ease',
            });
        } else {
            setMovingCardStyle({});
        }
    }, [movingCard]);

    const getCardImagePath = (card: string) => {
        const [suit] = card.split('_');
        const path = new URL(`../../../assets/cards/${suit}/${card}.svg`, import.meta.url).href;
        return path;
    };

    const handleShowCards = () => {
        setShowCards(true);
    };

    const handleCardClick = (card: string) => {
        setTableCards(prevTableCards => [...prevTableCards, card]);
        setGameData(prevGameData => {
            if (!prevGameData) return prevGameData;
            return {
                ...prevGameData,
                hand: prevGameData.hand.filter(c => c !== card),
                table: [...prevGameData.table, { card, beaten_by_card: null, participant_threw_by_id: null, participant_threw_to_id: 1 }]
            };
        });
    };

    const handleTableCardClick = (card: string) => {
        setSelectedCard(card);
        setCardOnTable(card);
    };

    const handleBeatCard = () => {
        if (!cardOnTable || !selectedCard) return;

        setGameData(prevGameData => {
            if (!prevGameData) return prevGameData;

            const updatedTable = prevGameData.table.map(cardObj =>
                cardObj.card === cardOnTable ? { ...cardObj, beaten_by_card: selectedCard } : cardObj
            );

            return {
                ...prevGameData,
                table: updatedTable,
            };
        });

        setTableCards(prevTableCards =>
            prevTableCards.filter(card => card !== cardOnTable)
        );

        setBeatenCards(prevBeatenCards => [...prevBeatenCards, cardOnTable]);
        setCardOnTable(null);
        setSelectedCard(null);
        setZIndex(cardOnTable);
    };

    const handleEndTurn = () => {
        if (!gameData) return;

        setBeatenCards(prevBeatenCards => [...prevBeatenCards, ...tableCards]);
        setTableCards([]);

        setGameData(prevGameData => {
            if (!prevGameData) return prevGameData;
            return {
                ...prevGameData,
                table: [],
            };
        });
    };

    return (
        <div className="play-game">
            <div className="table">
                {movingCard && (
                    <animated.img
                        src={getCardImagePath(movingCard)}
                        alt={movingCard}
                        className="card-image"
                        style={movingCardStyle}
                    />
                )}
                {tableCards.map((card, index) => (
                    <img
                        key={index}
                        src={getCardImagePath(card)}
                        alt={card}
                        className="card-image table-card"
                        onClick={() => handleTableCardClick(card)}
                    />
                ))}
                <div className="beaten-cards-container">
                    {beatenCards.map((card, index) => (
                        <img
                            key={index}
                            src={getCardImagePath(card)}
                            alt={card}
                            className="card-image beaten-card"
                            style={{ top: `${index * 20}px`, left: `${index * 20}px`, zIndex: (card === zIndex ? 1000 : 2) }}
                        />
                    ))}
                </div>
                {gameData?.trump_card && (
                    <div className="trump-card-container">
                        <img
                            src={getCardImagePath(gameData.trump_card)}
                            alt="Trump Card"
                            className="trump-card"
                        />
                        <img
                            src={back_card}
                            alt="Back Card"
                            className="back-card"
                        />
                    </div>
                )}
            </div>
            <div className="my-cards">
                {gameData && gameData.hand.map((card, index) => (
                    <img
                        key={index}
                        src={getCardImagePath(card)}
                        alt={card}
                        className={`card-image ${showCards && cardAnimation.includes(card) ? 'entered' : ''}`}
                        onClick={() => handleCardClick(card)}
                        style={{ zIndex: (card === selectedCard ? 1000 : 'auto') }}
                    />
                ))}
            </div>
            <button onClick={handleShowCards}>Show Cards</button>
            <button onClick={handleBeatCard} disabled={!selectedCard || !cardOnTable}>
                Beat Card
            </button>
            <button onClick={handleEndTurn}>End Turn</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default PlayGame;
