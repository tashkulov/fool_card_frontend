import cls from "./FooterPlayGame.module.scss"
import {useAppDispatch} from "../../../../hooks/useAppReduxToolkitTools/redux.ts";
import {markPlayerReadyThunk} from "../../statePlayGame/service/markPlayerReadyThunk.ts";

type TFooterPlayGameProps = {
    stateButtonReadiness: boolean
    gameId: string
}

const FooterPlayGame = (props: TFooterPlayGameProps) => {
    const { stateButtonReadiness, gameId } = props
    const dispatch = useAppDispatch()

    const getReady = () => {
        dispatch(markPlayerReadyThunk(Number(gameId)))
    }

    return (
        <div className={cls.main}>
            <div className={cls.wrapperButton}>
                <button
                    onClick={getReady}
                    type="button" className={stateButtonReadiness ? cls.button : cls.none}>
                    готов
                </button>
            </div>
        </div>
    );
};

export default FooterPlayGame;