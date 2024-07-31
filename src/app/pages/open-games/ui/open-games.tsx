import React, { useEffect, useState } from 'react';
import SkeletonPage from '../../../components/SkeletonPage/ui/SkeletPage.tsx';
import cls from "./open-game.module.scss"

import OpenGame from "./opneGeme/ui/OpenGame.tsx";
import { getDateOpenGames, TResponse } from "../getDateOpenGames/getDateOpenGames.ts";
import {Link} from "react-router-dom";

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
                    games.sort((a, b) => b.id - a.id).map((game) => (
                        <Link to={`/inGame/${game.id}`} key={game.id}>
                        <OpenGame
                            key={game.id}
                            experience={game.bet_value}
                            username={`Username ${game.id}`}
                            maxMembers={4}
                            currentMembers={3}
                        />
                        </Link>
                    ))
                ) : (
                    <div>Загрузка...</div>
                )}
            </div>
        </SkeletonPage>
    );
};

export default OpenGames;
