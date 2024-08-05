import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './new-game.css'
// import headerIllustration from '../../../assets/img/Header Illustration.svg';
import NewBet from '../../../assets/img/new-stavka.svg';
import Minus from '../../../assets/img/minus.svg';
import Plus from '../../../assets/img/pluss.svg';
import Check from "../../../assets/img/check_.svg"
import Footer from '../../components/Footer/Footer';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import HeaderRiveAnimation from '../../components/rive-conponents/ruby-header/ruby-component';
import HeaderMainSvgIcon from '../Widgets/Header/ui/SvgIcons/HeaderMainSvgIcon';


// Define the types for the props and states
type RiveAnimation = { play: () => void };

const CreateGameForm: React.FC = () => {

    const navigate = useNavigate();
    const { t } = useTranslation()
    const [betAmount, setBetAmount] = useState<number>(1200);
    const [selectedGameMode, setSelectedGameMode] = useState<string>('');
    const [selectedPlayerCount, setSelectedPlayerCount] = useState<string>('');
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [tossMode, setTossMode] = useState<string>('');
    const [gameEndingType, setGameEndingType] = useState<string>('');

    // Handle the bet amount change
    const handleBetChange = (increment: boolean, valueChange: number) => {
        setBetAmount((prevAmount) => prevAmount + (increment ? valueChange : -valueChange));
    };

    // Handle the game mode change
    const handleGameModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedGameMode(value === 'Подкидной' ? 'throwing' : value === 'Переводной' ? 'shifting' : value);
    };

    // Handle the player count change
    const handlePlayerCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPlayerCount(event.target.value);
    };

    // Handle the private game checkbox
    const handlePrivateGameChange = () => {
        setIsPrivate((prev) => !prev);
    };

    const handleTossModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTossMode(value === 'Соседи' ? 'neighbors' : value === 'Все' ? 'all' : value);
    };

    // Handle the game ending type change
    const handleGameEndingTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setGameEndingType(value === 'Классика' ? 'classic' : value === 'Ничья' ? 'draw' : value);
    };

    // Initialize Rive animations
    useEffect(() => {
        const riveAnimations: { [key: string]: RiveAnimation } = {};

        document.querySelectorAll('.rejim-check').forEach((radio) => {
            radio.addEventListener('change', () => {
                document.querySelectorAll(`input[name="${(radio as HTMLInputElement).name}"]`).forEach((groupRadio) => {
                    (groupRadio as HTMLInputElement).closest('.rejim-igry-block')?.classList.remove('active-rejim');
                });

                if ((radio as HTMLInputElement).checked) {
                    const activeBlock = (radio as HTMLInputElement).closest('.rejim-igry-block');
                    activeBlock?.classList.add('active-rejim');

                    const activeCanvas = activeBlock?.querySelector('canvas') as HTMLCanvasElement;
                    if (activeCanvas && riveAnimations[activeCanvas.id]) {
                        riveAnimations[activeCanvas.id].play();
                    }
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
        event.preventDefault();

        const requestData = {
            "bet_value": betAmount,
            "card_amount": 36, // Update with actual value if available
            "participants_number": parseInt(selectedPlayerCount),
            "access_type": isPrivate ? 'private' : 'public',
            "status": 'ongoing', // This seems like a static value for now
            "game_mode": selectedGameMode,
            "toss_mode": tossMode,
            "game_ending_type": gameEndingType
        };

        try {
            const CreateGame = await axios.post('https://foolcard2.shop/v1/games', requestData, {
                headers: {
                    Authorization: '4fb2b710934814b6cd51160f7b1d84dac602d07d8b07909f'
                }
            });
            console.log('Game created successfully:', CreateGame.data);
            const gameId = CreateGame.data.id;
            // const createdById = CreateGame.data.created_by;

            // const response = await axios.post(`https://foolcard2.shop/v1/games/${gameId}/start`, {"id": gameId}, {
            //     headers: {
            //         'Authorization': localStorage.getItem('authorization')
            //     }
            // });
            // console.log(response.data)
            navigate(`/inGame/${gameId}/creator`);
        } catch (error) {
            console.error('Error creating game:', error, requestData);
        }

    };

    return (
        <div className="main main-wrapp">
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
                                    <div className="rejim-igry-blocks" key={mode}>
                                        <div className="rejim-igry-block block-obvodka">
                                            <label className="checkbox-container">
                                                <input
                                                    type="radio"
                                                    className={`rejim-check ${selectedGameMode === mode ? 'gameModeSelected' : ''}`}
                                                    value={mode}
                                                    name="rejim-1"
                                                    checked={selectedGameMode === (mode === 'Подкидной' ? 'throwing' : 'shifting')}
                                                    onChange={handleGameModeChange} />
                                                <div className="image-radio" id="images">
                                                    <img src={Check} alt="" />
                                                </div>
                                                <div className="icon-rejim">
                                                    <canvas id={mode.toLowerCase()}></canvas>
                                                    <div className="rej-text">{mode}</div>
                                                </div>
                                                <div className="checkmark"></div>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='game-mode-selector-container'>
                                {['Соседи', 'Все'].map((mode) => (
                                    <div className="rejim-igry-blocks" key={mode}>
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
                                                <div className="icon-rejim">
                                                    <canvas id={mode.toLowerCase()}></canvas>
                                                    <div className="rej-text">{mode}</div>
                                                </div>
                                                <div className="checkmark"></div>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='game-mode-selector-container'>
                                {['Классика', 'Ничья'].map((mode) => (
                                    <div className="rejim-igry-blocks" key={mode}>
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
                                                <div className="icon-rejim">
                                                    <canvas id={mode.toLowerCase()}></canvas>
                                                    <div className="rej-text">{mode}</div>
                                                </div>
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
                                    className={`col-igrok-block btn-krug block-obvodka ${selectedPlayerCount === count.toString() ? 'selected' : ''}`}
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

            <Footer></Footer>
        </div>
    );
};

export default CreateGameForm;
