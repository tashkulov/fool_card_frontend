import { createAsyncThunk } from "@reduxjs/toolkit";
import {$api} from "../../../../../api.ts";

export const beatCardThunk = createAsyncThunk<null, { gameId: number; cardToBeat: string; cardToBeatBy: string }, { rejectValue: string }>(
    'beatCard',
    async (payload, thunkAPI) => {
        try {
            const { gameId, cardToBeat, cardToBeatBy } = payload;
            const response = await $api.post<null>(`https://foolcard2.shop/v1/games/${gameId}/beat_card`, null, {
                params: {
                    card_to_beat: cardToBeat,
                    card_to_beat_by: cardToBeatBy
                }
            });
            return thunkAPI.fulfillWithValue(response.data);
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue("Ошибка при попытке побить карту");
        }
    }
);
