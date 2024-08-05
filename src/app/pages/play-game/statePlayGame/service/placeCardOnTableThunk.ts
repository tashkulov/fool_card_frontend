import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "../../../../../api.ts";

export const placeCardOnTableThunk = createAsyncThunk<
    null,
    { gameId: number; card: string },
    { rejectValue: string }
>(
    'statePlayPvPGame/placeCardOnTable',
    async (payload, thunkAPI) => {
        try {
            const { gameId, card } = payload;
            const url = `https://foolcard2.shop/v1/games/${gameId}/place_card_on_table?card=${card}`;
            const response = await $api.post<null>(url);
            return thunkAPI.fulfillWithValue(response.data);
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue("Ошибка при размещении карты на столе");
        }
    }
);
