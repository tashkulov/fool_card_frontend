import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {statePlayGameSliceReducer} from "../../pages/play-game/statePlayGame";

const rootReducer = combineReducers({
    playGame: statePlayGameSliceReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    });
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
