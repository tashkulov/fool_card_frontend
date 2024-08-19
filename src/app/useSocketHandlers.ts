import { SetStateAction, useEffect, useState } from 'react';
import { init_sockets, sendMessage, disconnectFromSocket, socket } from './socket';
import { GameState, RoomUser, Room } from './types';

export const useSocketHandlers = () => {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [players, setPlayers] = useState<RoomUser[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("authorization");
        if (token) {
            init_sockets(token);

            if (socket) {
                socket.on("room.new", (room: Room) => {
                    setRooms((prevRooms) => [...prevRooms, room]);
                });

                socket.on("room.del", (room: { id: string; }) => {
                    setRooms((prevRooms) => prevRooms.filter(r => r.id !== room.id));
                });

                socket.on("room.update", (update: { id: string; players: any; }) => {
                    setRooms((prevRooms) => prevRooms.map(room =>
                        room.id === update.id ? { ...room, players: update.players } : room
                    ));
                });

                socket.on("room.join", (newPlayer: RoomUser) => {
                    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
                });

                socket.on("room.leave", (leftPlayer: RoomUser) => {
                    setPlayers((prevPlayers) => prevPlayers.filter(p => p.seat !== leftPlayer.seat));
                });

                // События для входа и выхода из комнаты
                socket.on("joinRoom", (data: { state: SetStateAction<GameState | null>; roomer: RoomUser; }) => {
                    setGameState(data.state);
                    setPlayers([data.roomer]);
                });

                socket.on("leaveRoom", () => {
                    setGameState(null);
                    setPlayers([]);
                });

                // Проверка готовности
                socket.on("readyCheck", () => {
                    console.log("Началась проверка готовности");
                });

                socket.on("room.readycheck.ready", (user: RoomUser) => {
                    console.log(`Пользователь ${user.seat} готов`);
                });

                socket.on("room.readycheck.failed", (failedUser: RoomUser) => {
                    console.log(`Пользователь ${failedUser.seat} не прошел проверку готовности`);
                });

                // Начало хода
                socket.on("room.turn.new", (newGameState: GameState) => {
                    setGameState(newGameState);
                });

                // Карты выданы
                socket.on("giveCards", (cards: any) => {
                    console.log("Вам выдали новые карты:", cards);
                });

                socket.on("cardsGiven", (data: { user: RoomUser, amount: number }) => {
                    console.log(`Игроку ${data.user.seat} выдано ${data.amount} карт`);
                });

                // Обработка атак и защит
                socket.on("beaten", (newGameState: GameState) => {
                    setGameState(newGameState);
                    console.log("Карты побиты");
                });

                socket.on("take", (newGameState: GameState) => {
                    setGameState(newGameState);
                    console.log("Карты взяты");
                });
            }

            return () => disconnectFromSocket();
        }
    }, []);

    const joinRoom = (roomId: string) => {
        sendMessage('joinRoom', roomId);
    };

    const createRoom = (playersAmount: number, deckSize: number, gameMode: number) => {
        sendMessage('newRoom', { players_amount: playersAmount, deck_size: deckSize , gamemode: gameMode });
    };

    const leaveRoom = () => {
        sendMessage('leaveRoom', {});
    };

    const readyCheck = () => {
        sendMessage('readyCheck', {});
    };

    const throwCard = (card:string) => {
        sendMessage('throwCard', card);
    };

    const beatCard = (tablePairIndex: number, card:string) => {
        sendMessage('beatCard', { table_pair_index: tablePairIndex, card });
    };

    const beaten = () => {
        sendMessage('beaten', {});
    };

    const takeCards = () => {
        sendMessage('take', {});
    };

    return {
        gameState,
        rooms,
        players,
        joinRoom,
        createRoom,
        leaveRoom,
        readyCheck,
        throwCard,
        beatCard,
        beaten,
        takeCards,
    };
};
