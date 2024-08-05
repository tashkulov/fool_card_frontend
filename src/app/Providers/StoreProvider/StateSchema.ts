import { AxiosInstance } from "axios";
import {InitialStatePlayGame, statePlayGameSliceReducerName} from '../../pages/play-game/statePlayGame';
// import {
//     InitialStatePlayPvPGame,
//     statePlayGameSlice
// } from "../../pages/play-game/playGameSlice.ts";

export interface StateSchema {
    [statePlayGameSliceReducerName]: InitialStatePlayGame,
    // [statePlayGameSlice]:InitialStatePlayPvPGame
}

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema
}
