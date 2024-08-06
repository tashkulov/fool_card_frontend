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

type TMainGameProps = {
    gameId: string;
};

const MainGame = (props: TMainGameProps) => {
    const dispatch = useAppDispatch();
    const { gameId } = props;
    const data = useAppSelector((state: RootState) => state.playGame);
    const [movingCard, setMovingCard] = useState<string | null>(null);

    useEffect(() => {
        const fetchTableData = () => {
            dispatch(getCurrentTableThunk(Number(gameId)));
        };

        // Fetch data initially
        fetchTableData();

        // Set up polling
        const interval = setInterval(fetchTableData, 5000);

        return () => clearInterval(interval);
    }, [dispatch, gameId]);

    useEffect(() => {
        if (movingCard) {
            // Анимация карты
            setTimeout(() => {
                setMovingCard(null);
            }, 500); // Длительность анимации
        }
    }, [movingCard]);

    const table = data.currentTable?.table;
    const playerHand = data.currentTable?.hand ?? [];
    const opponentCardsAmount = data.currentTable?.participants['224']?.cards_amount ?? 0;
    const opponentCards = new Array(opponentCardsAmount).fill('back_card');

    const handleCardClick = (card: string) => {
        setMovingCard(card); // Запуск анимации
        dispatch(placeCardOnTableThunk({ gameId: Number(gameId), card }));
    };

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
                        onClick={() => handleCardClick(card)}
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
                {table?.map((card: string, index: number) => (
                    <img
                        key={index}
                        src={getCardImagePath(card.card)}
                        alt={card}
                    />
                ))}
            </div>
        </div>
    );
};

export default MainGame;
