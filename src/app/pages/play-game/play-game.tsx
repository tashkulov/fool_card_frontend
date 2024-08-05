// // src/components/PlayGame.js
// import axios from 'axios';
// // ... остальной импорт
//
// const BASE_URL = 'https://foolcard2.shop/v1';
// const HEADERS = { 'Content-Type': 'application/json', 'Authorization': '4fb2b710934814b6cd51160f7b1d84dac602d07d8b07909f' };
//
// const PlayGame = () => {
//     const dispatch = useAppDispatch();
//     const statePlayGame = useAppSelector((state: RootState) => state.playGame);
//     const { gameId, who } = useParams<{ gameId: string, who: string }>();
//
//     const [gameData, setGameData] = useState<GameData | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [selectedCard, setSelectedCard] = useState<string | null>(null);
//     const [isAnimating, setIsAnimating] = useState(false);
//     const cardAnimationContainerRef = useRef<HTMLDivElement | null>(null);
//     const handRef = useRef<HTMLDivElement | null>(null);
//     const [myCards, setMyCards] = useState<string[]>([]);
//     const [tableCards, setTableCards] = useState<{ card: string, beaten_by_card: string | null }[]>([]);
//     const [attackMode, setAttackMode] = useState<boolean>(true);
//     const [id, setId] = useState<number>(0);
//     const [error, setError] = useState<string | null>(null);
//     const [waiting, setWaiting] = useState<boolean>(true);
//     const [errorUseParams, setErrorUseParams] = useState<boolean>(false);
//
//     useEffect(() => {
//         if (Number(gameId)) {
//             if (gameId) {
//                 const ID: number = +gameId;
//                 setId(Number(ID));
//             } else {
//                 setErrorUseParams(true);
//             }
//         }
//     }, [gameId]);
//
//     useEffect(() => {
//         if (id !== 0) {
//             if (who === "guest") {
//                 console.log("guest");
//                 dispatch(joinInGameService(id));
//                 dispatch(getPlayers(id));
//             } else if (who === "creator") {
//                 console.log("creator");
//             }
//         }
//     }, [who, dispatch, id]);
//
//     useEffect(() => {
//         if (statePlayGame.players.length === statePlayGame.data.participants_number) {
//             console.log("Количество игроков соответствует количеству игроков для начала игры");
//         }
//     }, []);
//
//     useEffect(() => {
//         const loadGameData = async () => {
//             if (id) {
//                 try {
//                     const data = await fetchGameData(id);
//                     setGameData(data);
//                     setMyCards(data.hand);
//                     if (data.tableCards) {
//                         setTableCards(data.tableCards);
//                     }
//                     setLoading(false);
//                 } catch (error) {
//                     console.log('Error fetching game data:', error);
//                     setError('Failed to load game data');
//                     setLoading(false);
//                 }
//             }
//         };
//
//         loadGameData();
//
//         const intervalId = setInterval(loadGameData, 1000);
//
//         return () => clearInterval(intervalId);
//     }, [id]);
//
//     useEffect(() => {
//         if (selectedCard) {
//             setIsAnimating(true);
//             const timer = setTimeout(() => {
//                 setIsAnimating(false);
//                 setSelectedCard(null);
//             }, 500);
//             return () => clearTimeout(timer);
//         }
//     }, [selectedCard]);
//
//     const getCardImagePath = (card: string) => {
//         const [suit] = card.split('_');
//         const path = new URL(`../../../assets/cards/${suit}/${card}.svg`, import.meta.url).href;
//         return path;
//     };
//
//     const endTurnHandler = async () => {
//         if (hasUnbeatenCards()) {
//             toast.error('Необходимо побить все карты на столе, прежде чем завершить ход.');
//             return;
//         }
//
//         try {
//             await endTurn(id);
//             setTableCards([]);
//         } catch (error) {
//             console.error('Error ending turn:', error);
//             setError('Failed to end turn');
//         }
//     };
//
//     const handleCardClick = async (card: string) => {
//         if (attackMode) {
//             try {
//                 await placeCardOnTable(id, card);
//                 setSelectedCard(card);
//                 setIsAnimating(true);
//                 setTimeout(() => {
//                     setIsAnimating(false);
//                     setSelectedCard(null);
//                     setMyCards(prevCards => prevCards.filter(c => c !== card));
//                     setTableCards(prevTableCards => [...prevTableCards, { card, beaten_by_card: null }]);
//                     setAttackMode(false);
//                 }, 500);
//             } catch (error) {
//                 console.error('Error placing card on table:', error);
//             }
//         } else {
//             const cardToBeat = tableCards.find(t => t.beaten_by_card === null)?.card;
//
//             if (cardToBeat) {
//                 try {
//                     await beatCard(id, cardToBeat, card);
//
//                     setTableCards(prevTableCards =>
//                         prevTableCards.map(t =>
//                             t.card === cardToBeat ? { ...t, beaten_by_card: card } : t
//                         )
//                     );
//
//                     setMyCards(prevCards => prevCards.filter(c => c !== card));
//                     setAttackMode(true);
//                 } catch (error) {
//                     console.error('Error beating card:', error);
//                 }
//             }
//         }
//     };
//
//     const hasUnbeatenCards = () => tableCards.some(card => card.beaten_by_card === null);
//
//     const handleReadyClick = async () => {
//         try {
//             const result = await markPlayerReady(id);
//             if (result) {
//                 setWaiting(false);
//             }
//         } catch (error) {
//             console.error('Ошибка при отметке игрока как готового:', error);
//             setError('Не удалось отметить игрока как готового');
//         }
//     };
//
//     if (loading) return <div>Loading...</div>;
//     if (errorUseParams) return <div>Ошибка при получении адреса игры. Попробуйте перезайти в игру еще раз.</div>;
//     if (error) return <div>{error}</div>;
//
//     const angle = 20;
//     const offset = 30;
//     const middle = gameData ? Math.floor(gameData.hand.length / 2) : 0;
//
//     return (
//         <div className="wrapper">
//             <div className="plays">
//                 <section className="play-header">
//                     <div className="play-header-wrapper">
//                         <div className="play-header-block">
//                             <Link to={'/'} className="play-header-back block-obvodka">
//                                 <img src={arrow} alt="Back" />
//                             </Link>
//                             <div className="play-header-coin">
//                                 <img src={coins} alt="Coins" />
//                             </div>
//                         </div>
//                         <div className="play-header-rejim block-obvodka">
//                             <img src={card1} alt="Card 1" />
//                             <img src={card2} alt="Card 2" />
//                             <img src={card3} alt="Card 3" />
//                         </div>
//                     </div>
//                 </section>
//                 <div className="play-header-polosa"></div>
//                 <div className="play-header-polosa"></div>
//             </div>
//             <div className="main play-wrapper-game play-krug">
//                 {waiting ? (
//                     <WaitingForPlayers onReadyClick={handleReadyClick} />
//                 ) : (
//                     <div className="main-wrapper-plays">
//                         <div className="wrapper-plays-header"></div>
//                         <div className="wrapper-plays-game">
//                             <div className="players-blocks">
//                                 <div id="user-dumaet" style={{ borderRadius: '50%' }}>
//                                     <CountdownCircleTimer
//                                         isPlaying
//                                         duration={30}
//                                         size={90}
//                                         colors={['#18ee7b', '#80776DFF']}
//                                         colorsTime={[30, 0]}
//                                     >
//                                         {({}) => <img src={GamePlay} alt="Gameplay Avatar" />}
//                                     </CountdownCircleTimer>
//                                     <div className="second-player-hand">
//                                         {myCards.map((card, index) => (
//                                             <img
//                                                 key={card}
//                                                 src={back_card}
//                                                 alt="back_card_second_player"
//                                                 style={{
//                                                     zIndex: index + 1,
//                                                     width: 64,
//                                                     height: 90,
//                                                     transition: 'opacity 0.3s ease',
//                                                 }}
//                                             />
//                                         ))}
//                                     </div>
//                                 </div>
//                                 <div className="players-flex">
//                                     <div className="player-block1 footer-ava-wp1">
//                                         <img src={GamePlay} alt="Gameplay Avatar" />
//                                     </div>
//                                     <div className="player-block1 footer-ava-wp1">
//                                         <img src={GamePlay} alt="Gameplay Avatar" />
//                                     </div>
//                                 </div>
//                                 {gameData && (
//                                     <>
//                                         <div className="hand" ref={handRef}>
//                                             {gameData.hand.map((card, index) => (
//                                                 <div
//                                                     key={card}
//                                                     className={`card ${selectedCard === card ? 'selected' : ''}`}
//                                                     style={{
//                                                         transform: `rotate(${
//                                                             (index - middle) * angle
//                                                         }deg) translateY(${Math.abs(
//                                                             index - middle
//                                                         ) * -offset}px)`,
//                                                         zIndex: index + 1,
//                                                     }}
//                                                     onClick={() => handleCardClick(card)}
//                                                 >
//                                                     <img src={getCardImagePath(card)} alt={card} />
//                                                 </div>
//                                             ))}
//                                         </div>
//                                         <div
//                                             className={`card-animation-container ${
//                                                 isAnimating ? 'animating' : ''
//                                             }`}
//                                             ref={cardAnimationContainerRef}
//                                         >
//                                             {selectedCard && (
//                                                 <img
//                                                     src={getCardImagePath(selectedCard)}
//                                                     alt={selectedCard}
//                                                 />
//                                             )}
//                                         </div>
//                                     </>
//                                 )}
//                             </div>
//                             <button
//                                 className="end-turn-button block-obvodka"
//                                 onClick={endTurnHandler}
//                                 disabled={hasUnbeatenCards()}
//                             >
//                                 Завершить ход
//                             </button>
//                             <ToastContainer />
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
//
//
//
// export default PlayGame;
