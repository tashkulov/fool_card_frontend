interface Participant {
    cards_amount: number;
}
export interface TableCard {
    card: string;
    beaten_by_card: string | null;
}
export interface CurrentTableResponse {
    table: TableCard[];
    free_cards_amount: number;
    beaten_cards: string[];
    trump: string;
    trump_card: string;
    hand: string[];
    participants: Record<string, Participant>;
    target_id: number;
}
