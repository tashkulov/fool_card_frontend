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
