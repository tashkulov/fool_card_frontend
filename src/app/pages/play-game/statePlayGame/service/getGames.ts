import { $api } from "../../../../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGame } from "../types/game.ts";

export const getGames = createAsyncThunk<{games: IGame[], id: number}, number, { rejectValue: string }>(
    "getGames",
    async (id, thunkAPI) => {
        try {
            const response = await $api.get<IGame[]>(`/v1/games`);
            console.log(response, id)
            return thunkAPI.fulfillWithValue({games: response.data, id: id});
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue("Ошибка при получение всех игр");
        }
    }
);
