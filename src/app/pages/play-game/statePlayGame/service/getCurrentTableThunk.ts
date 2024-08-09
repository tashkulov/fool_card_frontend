import { createAsyncThunk } from "@reduxjs/toolkit";
import {$api} from "../../../../../api.ts";
import {CurrentTableResponse} from "../types/CurrentTableData.ts";

export const getCurrentTableThunk = createAsyncThunk<
    CurrentTableResponse,
    number,
    { rejectValue: string }
>(
    'statePlayPvPGame/getCurrentTable',
    async (gameId, thunkAPI) => {
        try {
            const url = `/v1/games/${gameId}/get_current_table`;
            const response = await $api.get<CurrentTableResponse>(url);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue("Ошибка при получении текущего стола");
        }
    }
);
