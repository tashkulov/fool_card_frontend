import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IJoinInGame } from "../types/joinInGame";
import { IPlayer } from "../types/players";
import { joinInGameService } from "../service/joinInGameService";
import { getPlayers } from "../service/getPlayers";
import {placeCardOnTableThunk} from "../service/placeCardOnTableThunk"
import { beatCardThunk } from "../service/beatCardThunk.ts"
import { endTurnThunk } from "../service/endTurnThunk.ts"
import { markPlayerReadyThunk } from "../service/markPlayerReadyThunk.ts"


interface ErrorPayload {
    message: string;
}

// Пример других асинхронных действий (thunks)

export interface InitialStatePlayGame {
    isLoading: boolean;
    errors: string[];
    players: IPlayer[];
    data: IJoinInGame;
    currentPlayer: string | null;
    tableCards: { card: string, beaten_by_card: string | null }[];
    myCards: string[];
    attackMode: boolean;
    waiting: boolean;
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
        created_by: 0,
    },
    currentPlayer: null,
    tableCards: [],
    myCards: [],
    attackMode: false,
    waiting: false,
};

export const statePlayGameSlice = createSlice({
    name: "statePlayGame",
    initialState,
    reducers: {
        setCurrentPlayer: (state, action: PayloadAction<string>) => {
            state.currentPlayer = action.payload;
        },
        setTableCards: (state, action: PayloadAction<{ card: string, beaten_by_card: string | null }[]>) => {
            state.tableCards = action.payload;
        },
        setMyCards: (state, action: PayloadAction<string[]>) => {
            state.myCards = action.payload;
        },
        setAttackMode: (state, action: PayloadAction<boolean>) => {
            state.attackMode = action.payload;
        },
        setWaiting: (state, action: PayloadAction<boolean>) => {
            state.waiting = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(joinInGameService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(joinInGameService.fulfilled, (state, action: PayloadAction<IJoinInGame>) => {
                state.isLoading = false;
                state.data = action.payload;
                state.waiting = true; // Set waiting state initially
            })
            .addCase(joinInGameService.rejected, (state, action) => {
                state.isLoading = false;
                const errorMessage = action.payload && typeof action.payload === 'object'
                    ? (action.payload as ErrorPayload).message || 'Unknown error'
                    : 'Unknown error';
                state.errors = [...state.errors, errorMessage];
            });

        builder
            .addCase(getPlayers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPlayers.fulfilled, (state, action: PayloadAction<IPlayer[]>) => {
                state.isLoading = false;
                state.players = action.payload;
            })
            .addCase(getPlayers.rejected, (state, action) => {
                state.isLoading = false;
                const errorMessage = action.payload && typeof action.payload === 'object'
                    ? (action.payload as ErrorPayload).message || 'Unknown error'
                    : 'Unknown error';
                state.errors = [...state.errors, errorMessage];
            });

        builder
            .addCase(placeCardOnTableThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(placeCardOnTableThunk.fulfilled, (state, action: PayloadAction<{ card : string }>) => {
                state.isLoading = false;
                const { card } = action.payload;
                state.tableCards.push({ card, beaten_by_card: null });
                state.myCards = state.myCards.filter(myCard => myCard !== card);
                state.attackMode = false;
            })
            .addCase(placeCardOnTableThunk.rejected, (state, action) => {
                state.isLoading = false;
                const errorMessage = action.payload && typeof action.payload === 'object'
                    ? (action.payload as ErrorPayload).message || 'Unknown error'
                    : 'Unknown error';
                state.errors = [...state.errors, errorMessage];
            });

        builder
            .addCase(beatCardThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(beatCardThunk.fulfilled, (state, action: PayloadAction<{cardToBeat: string, cardToBeatBy: string }>) => {
                state.isLoading = false;
                const { cardToBeat, cardToBeatBy } = action.payload;
                state.tableCards = state.tableCards.map(t =>
                    t.card === cardToBeat ? { ...t, beaten_by_card: cardToBeatBy } : t
                );
                state.myCards = state.myCards.filter(myCard => myCard !== cardToBeatBy);
                state.attackMode = true;
            })
            .addCase(beatCardThunk.rejected, (state, action) => {
                state.isLoading = false;
                const errorMessage = action.payload && typeof action.payload === 'object'
                    ? (action.payload as ErrorPayload).message || 'Unknown error'
                    : 'Unknown error';
                state.errors = [...state.errors, errorMessage];
            });

        builder
            .addCase(endTurnThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(endTurnThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.attackMode = true;
            })
            .addCase(endTurnThunk.rejected, (state, action) => {
                state.isLoading = false;
                const errorMessage = action.payload && typeof action.payload === 'object'
                    ? (action.payload as ErrorPayload).message || 'Unknown error'
                    : 'Unknown error';
                state.errors = [...state.errors, errorMessage];
            });

        builder
            .addCase(markPlayerReadyThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(markPlayerReadyThunk.fulfilled, (state) => {
                state.isLoading = false;
                state.waiting = false;
            })
            .addCase(markPlayerReadyThunk.rejected, (state, action) => {
                state.isLoading = false;
                const errorMessage = action.payload && typeof action.payload === 'object'
                    ? (action.payload as ErrorPayload).message || 'Unknown error'
                    : 'Unknown error';
                state.errors = [...state.errors, errorMessage];
            });
    },
});

export const {
    name: statePlayGameSliceReducerName,
    reducer: statePlayGameSliceReducer,
    actions: statePlayGameSliceAction,
} = statePlayGameSlice;
