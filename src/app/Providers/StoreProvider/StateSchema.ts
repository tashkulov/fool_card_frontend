import { AxiosInstance } from "axios";
import {InitialStatePlayGame, statePlayGameSliceReducerName} from '../../pages/play-game/statePlayGame';

export interface StateSchema {
    [statePlayGameSliceReducerName]: InitialStatePlayGame
}

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema
}
