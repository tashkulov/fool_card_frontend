import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./apiService";
import { joinInGameService } from "./statePlayGame/service/joinInGameService";
import { getPlayers } from "./statePlayGame/service/getPlayers";
import { IJoinInGame } from "./statePlayGame";
import { IPlayer } from "./statePlayGame/types/players";

export interface ErrorPayload {
    message?: string;
}

export interface InitialStatePlayPvPGame {
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

const initialState: InitialStatePlayPvPGame = {
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
    attackMode: true,
    waiting: true,
};

export const placeCardOnTableThunk = createAsyncThunk(
    'statePlayPvPGame/placeCardOnTable',
    async ({ gameId, card }: { gameId: number; card: string }) => {
        const response = await api.endpoints.placeCardOnTable.initiate({ gameId, card });
        return response;
    }
);

export const beatCardThunk = createAsyncThunk(
    'statePlayPvPGame/beatCard',
    async ({ gameId, cardToBeat, cardToBeatBy }: { gameId: number; cardToBeat: string; cardToBeatBy: string }) => {
        const response = await api.endpoints.beatCard.initiate({ gameId, cardToBeat, cardToBeatBy });
        return response;
    }
);

export const endTurnThunk = createAsyncThunk(
    'statePlayPvPGame/endTurn',
    async (gameId: number) => {
        const response = await api.endpoints.endTurn.initiate(gameId);
        return response;
    }
);

export const markPlayerReadyThunk = createAsyncThunk(
    'statePlayPvPGame/markPlayerReady',
    async (gameId: number) => {
        const response = await api.endpoints.markPlayerReady.initiate(gameId);
        return response;
    }
);



export const statePlayGameSlice = createSlice({
    name: "statePlayPvPGame",
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
            .addCase(placeCardOnTableThunk.fulfilled, (state, action: PayloadAction<any>) => {
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
            .addCase(beatCardThunk.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                const { cardToBeat, card } = action.payload;
                state.tableCards = state.tableCards.map(t =>
                    t.card === cardToBeat ? { ...t, beaten_by_card: card } : t
                );
                state.myCards = state.myCards.filter(myCard => myCard !== card);
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
    }
});

export const {
    setCurrentPlayer,
    setTableCards,
    setMyCards,
    setAttackMode,
    setWaiting,
} = statePlayGameSlice.actions;

export default statePlayGameSlice.reducer;
