import axios from 'axios';

const BASE_URL = 'https://foolcard2.shop/v1';
const HEADERS = {
    Authorization: 'd2ab280a297f92a9c5806cee2f4a1a71ee928274e0bbad5c'
};


export const joinInGame = async () => {
    try {
        // const response = await $api.get()
    } catch (e) {
        console.log("при попытке присоединиться к игре превзошла ошибка")
    }
}

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

export const markPlayerReady = async (gameId: number | string) => {
    try {
        await axios.post(
            `${BASE_URL}/games/${gameId}/ready`,
            {},
            { headers: HEADERS }
        );
    } catch (error) {
        throw new Error('Error marking player as ready');
    }
};
