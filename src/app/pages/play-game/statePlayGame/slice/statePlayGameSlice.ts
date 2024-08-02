import {IJoinInGame} from "../types/joinInGame";
import {IPlayer} from "../types/players.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {joinInGameService} from "../service/joinInGameService";
import {getPlayers} from "../service/getPlayers.ts";

export interface InitialStatePlayGame {
    isLoading: boolean,
    errors: string[],
    players: IPlayer[],
    data: IJoinInGame
}

const initialState: InitialStatePlayGame = {
    isLoading: false,
    errors: [],
    players: [],
    data: {
        bet_value: 0,
        card_amount: 0,
        participants_number: 0,
        access_type: "",
        status: "",
        game_mode: "",
        toss_mode: "",
        game_ending_type: "",
        id: 0,
        created_by: 0
    }
};

export const statePlayGameSlice = createSlice({
    name: "statePlayGame",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(joinInGameService.pending, (state) => {
                state.isLoading = true
            })
            .addCase(joinInGameService.fulfilled, (state, action: PayloadAction<IJoinInGame>) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(joinInGameService.rejected, (state, action) => {
                state.isLoading = false
                state.errors = [...state.errors, action.payload ?? "Unknown error"]
            })
        builder
            .addCase(getPlayers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPlayers.fulfilled, (state, action: PayloadAction<IPlayer[]>) => {
                state.isLoading = true
                state.players = action.payload
            })
            .addCase(getPlayers.rejected, (state, action) => {
                state.isLoading = false
                state.errors = [...state.errors, action.payload ?? "Unknown error"]
            })
    }
})

export const {
    name: statePlayGameSliceReducerName,
    reducer: statePlayGameSliceReducer,
    actions: statePlayGameSliceAction,
} = statePlayGameSlice