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
};

const FooterPlayGame = (props: TFooterPlayGameProps) => {
    const { stateButtonReadiness, gameId } = props;
    const dispatch = useAppDispatch();
    const data = useAppSelector((state: RootState) => state.playGame);
    const getReady = () => {
        dispatch(markPlayerReadyThunk(Number(gameId)));
    };

    const handleEndTurn = () => {
        dispatch(startAnimation()); // Запуск анимации
    };

    useEffect(() => {
        if (!data.stage) {
            const intervalId = setInterval(() => {
                markPlayerReadyThunk(Number(gameId));
                const res = data.players.find(player => player.is_ready === false)
                if (res === undefined) {
                    console.log("1234567890")
                    dispatch(statePlayGameSliceAction.setStageTrue())
                    clearInterval(intervalId)
                }
            }, 1000)

        }
    }, [data.stage]);

    return (
        <div className={cls.main}>
            <div className={cls.wrapperButton}>
                <button
                    onClick={data.waiting === false ? getReady : handleEndTurn }
                    type="button"
                    className={stateButtonReadiness ? cls.button : cls.none}
                >
                    {data.waiting === false
                        ? "Готов"
                        : data.waiting === null || typeof data.waiting === "string"
                            ? "Бито"
                            : ""}
                </button>
            </div>
        </div>
    );
};

export default FooterPlayGame;