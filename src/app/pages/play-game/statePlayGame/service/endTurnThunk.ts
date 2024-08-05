import { createAsyncThunk } from "@reduxjs/toolkit";
import {$api} from "../../../../../api.ts";

export const endTurnThunk = createAsyncThunk<null, number, { rejectValue: string }>(
    'statePlayPvPGame/endTurn',
    async (gameId, thunkAPI) => {
        try {
            const response =  await $api.post<null>(`https://foolcard2.shop/v1/games/${gameId}/end_turn`);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue("Ошибка при завершении хода");
        }
    }
);
