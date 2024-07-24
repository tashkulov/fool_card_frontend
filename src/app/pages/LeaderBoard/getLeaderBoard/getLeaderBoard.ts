import { AxiosResponse } from 'axios';
import { $api } from '../../../../api';
import {ITypeLeaderBord} from "../typeLeaderBord/typeLeaderBord.ts";


export const getLeaderBoard = async (): Promise<AxiosResponse<ITypeLeaderBord[]> | undefined> => {
    try {
        return await $api.get<ITypeLeaderBord[]>("/v1/users/leaderboard?page=0",);
    } catch (e) {
        console.log("ошибка при получение списка лидер борда");
        return undefined; // или можно бросить исключение: throw e;
    }
};
