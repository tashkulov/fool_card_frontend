import { $api } from "../../../../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPlayer } from "../types/players.ts";

export const getPlayers = createAsyncThunk<IPlayer[], number, { rejectValue: string }>(
    "getPlayers",
    async (id, thunkAPI) => {
        try {
            const response = await $api.post<IPlayer[]>(`https://foolcard2.shop/v1/games/${id}/get_participants_statuses`);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue("Ошибка при получение всех игроков");
        }
    }
);
