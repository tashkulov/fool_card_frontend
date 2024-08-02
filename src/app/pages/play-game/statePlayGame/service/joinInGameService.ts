import { $api } from "../../../../../api";
import { IJoinInGame } from "../types/joinInGame";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const joinInGameService = createAsyncThunk<IJoinInGame, number, { rejectValue: string }>(
    "joinInGameService",
    async (id, thunkAPI) => {
        console.log(id, "запрос на join")
        try {
            const response = await $api.post<IJoinInGame>(`/v1/games/${id}/join`);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue("Ошибка при присоединении к игре");
        }
    }
);
