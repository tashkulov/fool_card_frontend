export enum CardSuit {
    DIAMOND = 1,
    HEART = 2,
    CLUBS = 3,
    SPADES = 4
}


export class Card {
    constructor(public value: number, public suit: CardSuit) {}
}

export class RoomUser {
    constructor(
        public seat: number,
        public room_id: string,
        public isReady: boolean = false,
        public cards_amount: number = 0,
        public connected: boolean = true
    ) {}
}
export enum RuntimeUserState {
    NONE = 'n',
    INITING = 'i',
    MENU = 'm',
    INGAME_DISCONNECTED = 'ig_d',
    INGAME_CONNECTED = 'ig_c'
}

export interface GameState {
    players: RoomUser[];
    attacker: number;
    defender: number;
    cards_left: number;
    last_card: Card;
    table: TablePair[];
}

export interface TablePair {
    attacker: Card;
    defender: Card;
}

export interface Room {
    id: string;
    players: number;
    max_players: number;
    deck_size: number;
}



