import React, { useEffect, useState } from 'react';
import SkeletonPage from '../../../components/SkeletonPage/ui/SkeletPage.tsx';
import cls from "./open-game.module.scss"

import OpenGame from "./opneGeme/ui/OpenGame.tsx";
import { getDateOpenGames, TResponse } from "../getDateOpenGames/getDateOpenGames.ts";

const OpenGames: React.FC = () => {
    const [games, setGames] = useState<TResponse[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getDateOpenGames();
            if (typeof result === 'string') {
                setError(result);
            } else {
                setGames(result);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <SkeletonPage textHeader='Открытые'>
            <div className={cls.error}>Ошибка:{error}</div>
        </SkeletonPage>;
    }

    return (
        <SkeletonPage textHeader='Открытые'>
            <div className={cls.main}>
                {games ? (
                    games.map((game) => (
                        <OpenGame
                            key={game.id}
                            experience={game.bet_value}
                            username={`Username ${game.id}`}
                            maxMembers={4}
                            currentMembers={3}

                        />
                    ))
                ) : (
                    <div>Загрузка...</div>
                )}
            </div>
        </SkeletonPage>
    );
};

export default OpenGames;
