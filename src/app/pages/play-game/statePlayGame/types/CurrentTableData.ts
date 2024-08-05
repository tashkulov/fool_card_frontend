interface Participant {
    cards_amount: number;
}

export interface CurrentTableResponse {
    table: string[];
    free_cards_amount: number;
    beaten_cards: string[];
    trump: string;
    trump_card: string;
    hand: string[];
    participants: Record<string, Participant>;
    target_id: number;
}
