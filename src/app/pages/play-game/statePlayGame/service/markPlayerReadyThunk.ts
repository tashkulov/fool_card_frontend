import { createAsyncThunk } from "@reduxjs/toolkit";
import {$api} from "../../../../../api.ts";
import {MarkPlayerReadyResponse} from "../types/MarkPlayerReadyResponse.ts";



export const markPlayerReadyThunk = createAsyncThunk<
    MarkPlayerReadyResponse | null,
    number,
    { rejectValue: string }
>(
    'statePlayPvPGame/markPlayerReady',
    async (gameId, thunkAPI) => {
        try {
            const url = `https://foolcard2.shop/v1/games/${gameId}/ready`;
            const response = await $api.post<MarkPlayerReadyResponse>(url);
            console.log("markPlayerReadyThunk",response.data)
            return thunkAPI.fulfillWithValue(response.data);
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue("Ошибка при отметке игрока как готового");
        }
    }
);
