import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { stateFooterReducer } from "../../Entites/stateFooter/slice/stateFooter";

const rootReducer = combineReducers({
    stateFooter: stateFooterReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    });
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
