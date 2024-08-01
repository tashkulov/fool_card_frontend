import { createSlice } from "@reduxjs/toolkit";

export interface IFooterState {
    display: boolean;
}

const initialState: IFooterState = {
    display: true
};

export const stateFooterSlice = createSlice({
    name: "footer",
    initialState,
    reducers: {
        noneDisplay: (state) => {
            state.display = false
        },
        flexDisplay: (state) => {
            state.display = true
        }
    }
});

export const {
    name: stateFooterReducerName,
    reducer: stateFooterReducer,
    actions: stateFooterActions
} = stateFooterSlice;
