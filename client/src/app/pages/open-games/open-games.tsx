import React from 'react';
import './open-games.css'; // подключите стили
import card1 from "../../../assets/img/card1.svg";
import card2 from "../../../assets/img/card2.svg";
import card3 from "../../../assets/img/card3.svg";
import men from "../../../assets/img/men.svg";
import arrow from "../../../assets/img/strelka.svg";
import exp from "../../../assets/img/otkrytye-opit.svg";
import SkeletonPage from '../../components/SkeletonPage/ui/SkeletPage';

interface openGameProps {
    username: string;
    experience: number;
    currentMembers: number;
    maxMembers: number;
    cards: string[];
}

const OpenGame: React.FC<openGameProps> = ({ username, experience, currentMembers, maxMembers, cards }) => {
    return (
        <div className="otkrytye-block">
            <div className="otkrytye-block-opit">
                <img src={exp} alt="experience" />
                <p className="otkrytye-p-opit">{experience}</p>
            </div>
            <div className="otkrytye-block-name">
                <p className="otkrytye-name">{username}</p>
                <div className="otkrytye-name-knp block-obvodka">
                    <p>{currentMembers}/{maxMembers}</p>
                    <img src={men} alt="members" />
                </div>
            </div>
            <div className="otkrytye-block-cards">
                <div className="otkrytye-card">
                    {cards.map((card, index) => (
                        <a href="" key={index}>
                            <img src={card} alt={`card${index + 1}`} />
                        </a>
                    ))}
                </div>
                <div className="kvesty-block-btn block-obvodka btn-krug">
                    <button className="otkr-bt kvesty-block-button"><img src={arrow} alt="arrow" /></button>
                </div>
            </div>
        </div>
    );
};

const OpenGames: React.FC = () => {
    const blocks = [
        {
            username: 'Username_1',
            experience: 2000,
            currentMembers: 3,
            maxMembers: 4,
            cards: [card1, card2, card3]
        },
        // Можно добавить больше блоков по аналогии
    ];

    return (
        <SkeletonPage textHeader='Открытые'>
            <div className="main main-wrapp">

                <div className="container">

                    <div className="otkrytye-main">
                        {blocks.map((block, index) => (
                            <>
                                <OpenGame key={index} {...block} />
                                <OpenGame key={index} {...block} />
                                <OpenGame key={index} {...block} />
                                <OpenGame key={index} {...block} />
                                <OpenGame key={index} {...block} />
                                <OpenGame key={index} {...block} />
                                <OpenGame key={index} {...block} />
                                <OpenGame key={index} {...block} />
                            </>
                        ))}

                    </div>
                </div>


            </div>
        </SkeletonPage>

    );
};

export default OpenGames;