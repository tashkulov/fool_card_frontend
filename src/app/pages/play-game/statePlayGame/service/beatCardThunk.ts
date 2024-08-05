import {createAsyncThunk} from "@reduxjs/toolkit";
import {$api} from "../../../../../api.ts";

interface BeatCardPayload {
    gameId: number;
    cardToBeat: string;
    cardToBeatBy: string;
}

interface BeatCardResponse {
    cardToBeat: string;
    cardToBeatBy: string;
}

export const beatCardThunk  = createAsyncThunk<BeatCardResponse, BeatCardPayload, { rejectValue: string }>(
    'beatCard',
    async (payload, thunkAPI) => {
        try {
            const { gameId, cardToBeat, cardToBeatBy } = payload;
            await $api.post<null>(`https://foolcard2.shop/v1/games/${gameId}/beat_card`, null, {
                params: {
                    card_to_beat: cardToBeat,
                    card_to_beat_by: cardToBeatBy
                }
            });
            return thunkAPI.fulfillWithValue({ cardToBeat, cardToBeatBy });
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue("Ошибка при попытке побить карту");
        }
    }
);
