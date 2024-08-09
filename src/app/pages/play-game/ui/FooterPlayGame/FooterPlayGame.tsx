import cls from "./FooterPlayGame.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useAppReduxToolkitTools/redux.ts";
import { markPlayerReadyThunk } from "../../statePlayGame/service/markPlayerReadyThunk.ts";
import { RootState } from "../../../../Providers/StoreProvider/store.ts";
import { useEffect } from "react";
import { statePlayGameSliceAction } from "../../statePlayGame";
import { startAnimation } from "../../statePlayGame/slice/statePlayGameSlice.ts";

type TFooterPlayGameProps = {
    stateButtonReadiness: boolean;
    gameId: string;
    showWarning: boolean;
    setShowWarning: (value: boolean) => void;
};

const FooterPlayGame = (props: TFooterPlayGameProps) => {
    const { stateButtonReadiness, gameId, showWarning, setShowWarning } = props;
    const dispatch = useAppDispatch();
    const data = useAppSelector((state: RootState) => state.playGame);

    const hasUnbeatenCards = () => {
        return data.tableCards.some(card => card.beaten_by_card === null);
    };

    const getReady = () => {
        dispatch(markPlayerReadyThunk(Number(gameId)));
    };

    const handleEndTurn = () => {
        if (hasUnbeatenCards()) {
            setShowWarning(true);
            setTimeout(() => setShowWarning(false), 3000);
        } else {
            dispatch(startAnimation());
        }
    };

    useEffect(() => {
        if (!data.stage) {
            const intervalId = setInterval(() => {
                markPlayerReadyThunk(Number(gameId));
                const res = data.players.find(player => player.is_ready === false);
                if (res === undefined) {
                    dispatch(statePlayGameSliceAction.setStageTrue());
                    clearInterval(intervalId);
                }
            }, 1000);
        }
    }, [data.stage]);

    return (
        <div className={cls.main}>
            <div className={cls.wrapperButton}>
                <button
                    onClick={data.waiting === false ? getReady : handleEndTurn }
                    type="button"
                    className={stateButtonReadiness ? cls.button : cls.none}
                    disabled={data.waiting !== false && hasUnbeatenCards()}
                >
                    {data.waiting === false
                        ? "Готов"
                        : data.waiting === null || typeof data.waiting === "string"
                            ? "Бито"
                            : ""}
                </button>
                {showWarning && <div className={cls.warning}>Карты не побиты</div>}
            </div>
        </div>
    );
};

export default FooterPlayGame;
