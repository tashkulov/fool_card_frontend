import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IJoinInGame } from "../types/joinInGame";
import { IPlayer } from "../types/players";
import { joinInGameService } from "../service/joinInGameService";
import { getPlayers } from "../service/getPlayers";
import { placeCardOnTableThunk } from "../service/placeCardOnTableThunk"
import { beatCardThunk } from "../service/beatCardThunk.ts"
import { endTurnThunk } from "../service/endTurnThunk.ts"
import { markPlayerReadyThunk } from "../service/markPlayerReadyThunk.ts"
import { getCurrentTableThunk } from "../service/getCurrentTableThunk.ts";
import { CurrentTableResponse } from "../types/CurrentTableData.ts";
import {getGames} from "../service/getGames.ts";
import {IGame} from "../types/game.ts";
import {MarkPlayerReadyResponse} from "../types/MarkPlayerReadyResponse.ts";


interface ErrorPayload {
    message: string;
}


export interface InitialStatePlayGame {
    isLoading: boolean;
    errors: string[];
    players: IPlayer[];
    data: IJoinInGame;
    stage: boolean;
    games: IGame[];
    participants_number: number;
    currentPlayer: string | null;
    tableCards: { card: string, beaten_by_card: string | null }[];
    myCards: string[];
    attackMode: boolean;
    waiting: boolean | null;
    currentTable: CurrentTableResponse | null;
}

const initialState: InitialStatePlayGame = {
    isLoading: false,
    errors: [],
    players: [],
    games: [],
    participants_number: 0,
    stage: false,
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
    currentTable: null,
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
        setStageTrue: (state) => {
            state.stage = true
        },
        setReset: (state) => {
            Object.assign(state, initialState);
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
            .addCase(getCurrentTableThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrentTableThunk.fulfilled, (state, action: PayloadAction<CurrentTableResponse>) => {
                state.isLoading = false;
                state.currentTable = action.payload;
            })
            .addCase(getCurrentTableThunk.rejected, (state, action) => {
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
            .addCase(markPlayerReadyThunk.fulfilled, (state, action: PayloadAction<MarkPlayerReadyResponse | null>) => {
                state.isLoading = false;
                state.waiting = typeof action.payload === "string" ? action.payload : null;
            })
            .addCase(markPlayerReadyThunk.rejected, (state, action) => {
                state.isLoading = false;
                const errorMessage = action.payload && typeof action.payload === 'object'
                    ? (action.payload as ErrorPayload).message || 'Unknown error'
                    : 'Unknown error';
                state.errors = [...state.errors, errorMessage];
            });
        builder
            .addCase(getGames.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGames.fulfilled, (state, action: PayloadAction<{games: IGame[], id: number}>) => {
                state.isLoading = false
                state.games = action.payload.games
                state.participants_number = Number(action.payload.games.find(game => game.id === action.payload.id)?.participants_number)
            })
            .addCase(getGames.rejected, (state, action) => {
                state.isLoading = false
                const errorMessage = action.payload && typeof action.payload === 'object'
                    ? (action.payload as ErrorPayload).message || 'Unknown error'
                    : 'Unknown error';
                state.errors = [...state.errors, errorMessage];
            })
    },
});

export const {
    name: statePlayGameSliceReducerName,
    reducer: statePlayGameSliceReducer,
    actions: statePlayGameSliceAction,
} = statePlayGameSlice;

