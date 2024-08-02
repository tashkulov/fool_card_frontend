import axios from 'axios';

const BASE_URL = 'https://foolcard2.shop/v1';
const HEADERS = {
    'Content-Type': 'application/json',
    Authorization: '01952c352d690981307e5ef18a4aa703eaf3761a5ded39d4',
};

export const joinInGame = async () => {
    try {
        // const response = await $api.get()
    } catch (e) {
        console.log("При попытке присоединиться к игре произошла ошибка:", e);
    }
};

export const fetchGameData = async (gameId: number | string) => {
    try {
        const response = await axios.get(`${BASE_URL}/games/${gameId}/get_current_table`, {
            headers: HEADERS,
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка загрузки данных игры:', error);
        throw new Error('Failed to load game data');
    }
};

export const fetchGameList = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/games`, {
            headers: HEADERS,
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка загрузки списка игр:', error);
        throw new Error('Failed to load game list');
    }
};

export const placeCardOnTable = async (gameId: number | string, card: string) => {
    try {
        await axios.post(
            `${BASE_URL}/games/${gameId}/place_card_on_table?card=${card}`,
            {},
            { headers: HEADERS }
        );
    } catch (error) {
        console.error('Ошибка при размещении карты на столе:', error);
        throw new Error('Error placing card on table');
    }
};

export const beatCard = async (gameId: number | string, cardToBeat: string, cardToBeatBy: string) => {
    try {
        await axios.post(
            `${BASE_URL}/games/${gameId}/beat_card?card_to_beat=${cardToBeat}&card_to_beat_by=${cardToBeatBy}`,
            {},
            { headers: HEADERS }
        );
    } catch (error) {
        console.error('Ошибка при побитии карты:', error);
        throw new Error('Error beating card');
    }
};

export const endTurn = async (gameId: number | string) => {
    try {
        await axios.post(`${BASE_URL}/games/${gameId}/end_turn`, {}, { headers: HEADERS });
    } catch (error) {
        console.error('Ошибка при завершении хода:', error);
        throw new Error('Error ending turn');
    }
};

export const markPlayerReady = async (gameId: number | string) => {
    try {
        await axios.post(`${BASE_URL}/games/${gameId}/ready`, {}, { headers: HEADERS });
        return true;
    } catch (error) {
        console.error('Ошибка при отметке игрока как готового:', error);
        throw new Error('Не удалось отметить игрока как готового');
    }
};