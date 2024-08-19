import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import './new-game.css'
// import headerIllustration from '../../../assets/svgIcon/Header Illustration.svg';
import NewBet from '../../../assets/img/new-stavka.svg';
import Minus from '../../../assets/img/minus.svg';
import Plus from '../../../assets/img/pluss.svg';
import Check from "../../../assets/img/check_.svg"
import { useTranslation } from "react-i18next";
import HeaderRiveAnimation from '../../components/rive-conponents/header-animations/ruby-header/ruby-component';
import HeaderMainSvgIcon from '../Widgets/Header/ui/SvgIcons/HeaderMainSvgIcon';
import ModeRiveAnimation from '../../components/rive-conponents/new-game-page-animations/mode-anim';

import { init_socket } from '../../init_sockets.ts';

import { useSocketHandlers } from '../../useSocketHandlers.ts';
const { createRoom, joinRoom } = useSocketHandlers();



const auth_token = localStorage.getItem('authorization');






const CreateGameForm: React.FC = () => {
    const { t } = useTranslation();
    const [betAmount, setBetAmount] = useState<number>(1200);
    const [selectedGameMode, setSelectedGameMode] = useState<string>('');
    const [selectedPlayerCount, setSelectedPlayerCount] = useState<string>('');
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [tossMode, setTossMode] = useState<string>('');
    const [gameEndingType, setGameEndingType] = useState<string>('');
    const [active, setActive] = useState<string>('');
    const [errorString, setErrorString] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);


    const handleBetChange = (increment: boolean, valueChange: number) => {
        setBetAmount((prevAmount) => prevAmount + (increment ? valueChange : -valueChange));
    };

    const handleGameModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedGameMode(value === 'Подкидной' ? 'throwing' : value === 'Переводной' ? 'passing' : value);
        setActive(value === 'Подкидной' ? 'casuals' : 'shift');

    };

    const handlePlayerCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPlayerCount(event.target.value);
    };

    const handlePrivateGameChange = () => {
        setIsPrivate((prev) => !prev);
    };

    const handleTossModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTossMode(value === 'Соседи' ? 'neighbors' : value === 'Все' ? 'all' : value);

        setActive(value === 'Соседи' ? 'neighbors' : 'all')

    };

    const handleGameEndingTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setGameEndingType(value === 'Классика' ? 'classic' : value === 'Ничья' ? 'draw' : value);

        setActive(value === 'Классика' ? 'classic' : 'draw');
    };

    useEffect(() => {
        document.querySelectorAll('.rejim-check').forEach((radio) => {
            radio.addEventListener('change', () => {
                document.querySelectorAll(`input[name="${(radio as HTMLInputElement).name}"]`).forEach((groupRadio) => {
                    (groupRadio as HTMLInputElement).closest('.rejim-igry-block')?.classList.remove('active-rejim');
                });

                if ((radio as HTMLInputElement).checked) {
                    const activeBlock = (radio as HTMLInputElement).closest('.rejim-igry-block');
                    activeBlock?.classList.add('active-rejim');
                }
            });
        });

        return () => {
            document.querySelectorAll('.rejim-check').forEach((radio) => {
                radio.removeEventListener('change', () => { });
            });
        };
    }, []);




    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setIsSubmitted(true);
        event.preventDefault();

        const requestData = {
            "deck_size": 36, // Update with actual value if available
            "players_amount": parseInt(selectedPlayerCount),
            "game_mode": 1,
        };

        try {
            if (selectedPlayerCount != '' && selectedGameMode != '' && tossMode != '' && gameEndingType != '') {
                setErrorString('')
                if (betAmount >= 100) {
                    setErrorString('')

                    if (auth_token) {
                        const socket = init_socket(auth_token)

                        createRoom(36, parseInt(selectedPlayerCount))

                        socket.on('room.new', (data) => {
                            const roomId = data.id

                            joinRoom(roomId)
                        })
                    }




                } else {
                    setErrorString('bet amount is les then 100!')
                }
            } else {
                setErrorString('fill all the needed inputs!')
            }

        } catch (error) {
            console.error('Error creating game:', error, requestData);
        }

    };

    return (
        <div className="main main-wrapp">
            <p className='error-string'>{errorString}</p>
            <div className='header'>
                <HeaderRiveAnimation />
                <HeaderMainSvgIcon />
            </div>

            <section className="kvesty-title new-games">

                <form onSubmit={handleSubmit} className="form-new-game">
                    <div className="kvesty-title-wrapper new-game-wrapper title-wrapper">
                        <p className="new-game-stavkap">{t("Ваша ставка")}</p>
                        <div className="block-obvodka new-game-sts">
                            <img src={NewBet} alt="" />
                            <div className='bet-value'>{betAmount}</div>

                        </div>
                    </div>

                    <div className="new-game-main">
                        <div className="new-game-blocks">
                            <div className="new-game-plus">
                                {['100', '1К', '10К', '100К'].map((text, index) => {
                                    const value = parseInt(text.replace('К', '000'), 10);
                                    return (
                                        <div className="plus-block block-obvodka" key={index}>
                                            <div
                                                className="plus-block-minus block-obvodka"
                                                onClick={() => handleBetChange(false, value)}
                                            >
                                                <img src={Minus} alt="" />
                                            </div>
                                            <p className="plus-block-p">{text}</p>
                                            <div
                                                className="plus-block-minus plus block-obvodka"
                                                onClick={() => handleBetChange(true, value)}
                                            >
                                                <img src={Plus} alt="" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="rejim-igry">
                        <p className="rejim-igry-p">{t("Режим игры")}</p>
                        <div className="rejim-igry-blocks-flex">
                            <div className='game-mode-selector-container'>
                                {['Подкидной', 'Переводной'].map((mode) => (
                                    <div className={`rejim-igry-blocks ${isSubmitted ? (!selectedGameMode ? 'un-cheked' : '') : (!selectedGameMode ? 'required-field' : '')}`} key={mode}>
                                        <div className="rejim-igry-block block-obvodka">
                                            <label className="checkbox-container">
                                                <input
                                                    type="radio"
                                                    className={`rejim-check ${selectedGameMode === mode ? 'gameModeSelected' : ''}`}
                                                    value={mode}
                                                    name="rejim-1"
                                                    checked={selectedGameMode === (mode === 'Подкидной' ? 'throwing' : 'passing')}
                                                    onChange={handleGameModeChange} />
                                                <div className="image-radio" id="images">
                                                    <img src={Check} alt="" />
                                                </div>

                                                <ModeRiveAnimation active={active === (mode === 'Подкидной' ? 'casuals' : 'shift')} path={mode === 'Подкидной' ? 'casual' : 'shift'} />
                                                <div className="rej-text">{mode}</div>

                                                <div className="checkmark"></div>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='game-mode-selector-container'>
                                {['Соседи', 'Все'].map((mode) => (
                                    <div className={`rejim-igry-blocks ${isSubmitted ? (!tossMode ? 'un-cheked' : '') : (!tossMode ? 'required-field' : '')}`} key={mode}>
                                        <div className="rejim-igry-block block-obvodka">
                                            <label className="checkbox-container">
                                                <input
                                                    type="radio"
                                                    className={`rejim-check ${tossMode === mode ? 'gameModeSelected' : ''}`}
                                                    value={mode}
                                                    name="rejim-2"
                                                    checked={tossMode === (mode === 'Соседи' ? 'neighbors' : 'all')}
                                                    onChange={handleTossModeChange} />
                                                <div className="image-radio" id="images">
                                                    <img src={Check} alt="" />
                                                </div>
                                                <ModeRiveAnimation active={active === (mode === 'Соседи' ? 'neighbors' : 'all')} path={mode === 'Соседи' ? 'neighbors' : 'all'} />
                                                <div className="rej-text">{mode}</div>
                                                <div className="checkmark"></div>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='game-mode-selector-container'>
                                {['Классика', 'Ничья'].map((mode) => (
                                    <div className={`rejim-igry-blocks ${isSubmitted ? (!gameEndingType ? 'un-cheked' : '') : (!gameEndingType ? 'required-field' : '')}`} key={mode}>
                                        <div className="rejim-igry-block block-obvodka">
                                            <label className="checkbox-container">
                                                <input
                                                    type="radio"
                                                    className={`rejim-check ${gameEndingType === mode ? 'gameModeSelected' : ''}`}
                                                    value={mode}
                                                    name="rejim-3"
                                                    checked={gameEndingType === (mode === 'Классика' ? 'classic' : 'draw')}
                                                    onChange={handleGameEndingTypeChange} />
                                                <div className="image-radio" id="images">
                                                    <img src={Check} alt="" />
                                                </div>
                                                <ModeRiveAnimation active={active === (mode === 'Классика' ? 'classic' : 'draw')} path={mode === 'Классика' ? 'classic' : 'draw'} />
                                                <div className="rej-text">{mode}</div>
                                                <div className="checkmark"></div>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    <div className="col-igrok">
                        <p className="rejim-igry-p">{t("Количество игроков")}</p>
                        <div className="col-igrok-blocks">
                            {[2, 3, 4].map((count) => (
                                <div
                                    className={`col-igrok-block btn-krug block-obvodka ${selectedPlayerCount === count.toString() ? 'selected' : ''} ${isSubmitted ? (!selectedPlayerCount ? 'un-cheked' : '') : (!selectedPlayerCount ? 'required-field' : '')}`}
                                    key={count}
                                >
                                    <label className="checkbox-container">
                                        <input
                                            type="radio"
                                            className="rejim-check"
                                            value={count}
                                            name="kolvo"
                                            checked={selectedPlayerCount === count.toString()}
                                            onChange={handlePlayerCountChange} />
                                        <div className="image-radio" id="images">
                                            <img src={Check} alt="" />
                                        </div>
                                        <div className="icon-rejim">
                                            <div className="kolvo-text">{count}</div>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="create-game">
                        <div className="create-game-block">
                            <div className="create-checkbox">
                                <label className="checkboxer">
                                    <input
                                        type="checkbox"
                                        className="custom-c"
                                        checked={isPrivate}
                                        onChange={handlePrivateGameChange} />
                                    <span className="checkmark block-obvodka"></span>
                                    <p>{t("Приватная игра")}</p>
                                </label>

                                <input type="submit" className="create-kn block-obvodka" value={t("Создать")} />
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default CreateGameForm;
