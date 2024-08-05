import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {statePlayGameSliceReducer} from "../../pages/play-game/statePlayGame";
import {statePlayGameSlice} from "../../pages/play-game/playGameSlice.ts";

const rootReducer = combineReducers({
    playGame: statePlayGameSliceReducer,
    playGamePvP: statePlayGameSlice,

});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    });
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
