import axios from 'axios';

const BASE_URL = 'https://foolcard2.shop/v1';
const HEADERS = {
    Authorization: 'cd449c39700f42c038ce283683bc9b3a6557a644c86d175a',
};

export const fetchGameData = async (gameId: number | string) => {
    try {
        const response = await axios.get(`${BASE_URL}/games/${gameId}/get_current_table`, {
            headers: HEADERS,
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to load game data');
    }
};

// Получение списка игр
export const fetchGameList = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/games`, {
            headers: HEADERS,
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to load game list');
    }
};

// Размещение карты на столе
export const placeCardOnTable = async (gameId: number | string, card: string) => {
    try {
        await axios.post(
            `${BASE_URL}/games/${gameId}/place_card_on_table?card=${card}`,
            {},
            { headers: HEADERS }
        );
    } catch (error) {
        throw new Error('Error placing card on table');
    }
};

// Побитие карты
export const beatCard = async (gameId: number | string, cardToBeat: string, cardToBeatBy: string) => {
    try {
        await axios.post(
            `${BASE_URL}/games/${gameId}/beat_card?card_to_beat=${cardToBeat}&card_to_beat_by=${cardToBeatBy}`,
            {},
            { headers: HEADERS }
        );
    } catch (error) {
        throw new Error('Error beating card');
    }
};

// Окончание хода
export const endTurn = async (gameId: number | string) => {
    try {
        await axios.post(
            `${BASE_URL}/games/${gameId}/end_turn`,
            {},
            { headers: HEADERS }
        );
    } catch (error) {
        throw new Error('Error ending turn');
    }
};
