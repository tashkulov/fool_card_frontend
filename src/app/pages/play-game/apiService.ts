import axios from 'axios';

const BASE_URL = 'http://77.222.37.34:8001/v1';

const AUTH_TOKEN = '461cc7f4f326092bd3967341eda52b594d0cee1932a3759e';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: AUTH_TOKEN,
    },
});

// Define a type for the game data structure
export interface GameData {
    trump_card: string;
    hand: string[];
}

export interface GameListItem {
    bet_value: number;
    card_amount: number;
    participants_number: number;
    access_type: string;
    status: string;
    game_mode: string;
    toss_mode: string;
    game_ending_type: string;
    id: number;
    created_by: number;
}

export const fetchGameData = async (gameId: number): Promise<GameData> => {
    try {
        const response = await axiosInstance.get<GameData>(`/games/${gameId}/get_current_table`);
        return response.data;
    } catch (error) {
        console.error('Error fetching game data:', error);
        throw error;
    }
};

export const fetchGameList = async (): Promise<GameListItem[]> => {
    try {
        const response = await axiosInstance.get<GameListItem[]>('/games');
        return response.data;
    } catch (error) {
        console.error('Error fetching game list:', error);
        throw error;
    }
};