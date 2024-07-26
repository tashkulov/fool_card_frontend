import { $api } from "../../../../api.ts";
import { AxiosResponse } from "axios";

export type TResponse = {
    access_type: string;
    bet_value: number;
    card_amount: number;
    created_by: number;
    game_ending_type: string;
    game_mode: string;
    id: number;
    participants_number: number;
    status: number;
    toss_mode: string;
};

export const getDateOpenGames = async (): Promise<TResponse[] | string> => {
    try {
        const response: AxiosResponse<TResponse[]> = await $api.get("/v1/games");
        console.log(response);
        return response.data;
    } catch (e) {
        console.log(e);
        return "ошибка при получении данных";
    }
};
