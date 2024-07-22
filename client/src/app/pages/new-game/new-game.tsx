import React, { useState, useEffect } from 'react';
import './new-game.css'
import headerIllustration from '../../../assets/img/header-illustration.png';
import NewBet from '../../../assets/img/new-stavka.svg';
import Minus from '../../../assets/img/minus.svg';
import Plus from '../../../assets/img/pluss.svg';


// Define the types for the props and states
type RiveAnimation = { play: () => void };

const CreateGameForm: React.FC = () => {
    const [betAmount, setBetAmount] = useState<number>(1200);
    const [selectedGameMode, setSelectedGameMode] = useState<string>('');
    const [selectedPlayerCount, setSelectedPlayerCount] = useState<string>('');
    const [isPrivate, setIsPrivate] = useState<boolean>(false);

    // Handle the bet amount change
    const handleBetChange = (increment: boolean, valueChange: number) => {
        setBetAmount((prevAmount) => prevAmount + (increment ? valueChange : -valueChange));
    };

    // Handle the game mode change
    const handleGameModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedGameMode(event.target.value);
    };

    // Handle the player count change
    const handlePlayerCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPlayerCount(event.target.value);
    };

    // Handle the private game checkbox
    const handlePrivateGameChange = () => {
        setIsPrivate((prev) => !prev);
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

    return (
        <div className="main main-wrapp">
            <div className='header-illustration'>
                <img className='header-illustration-img' src={headerIllustration} alt="" />
            </div>
            <section className="kvesty-title new-games">
                <div className="container">
                    <form className="form-new-game">
                        <div className="kvesty-title-wrapper new-game-wrapper title-wrapper">
                            <p className="new-game-stavkap">Ваша ставка</p>
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
                            <p className="rejim-igry-p">Режим игры</p>
                            <div className="rejim-igry-blocks-flex">
                                <div className='game-mode-selector-container'>
                                    {['Подкидной', 'Переводной'].map((mode) => (
                                        <div className="rejim-igry-blocks" key={mode}>
                                            <div className="rejim-igry-block block-obvodka">
                                                <label className="checkbox-container">
                                                    <input
                                                        type="radio"
                                                        className="rejim-check"
                                                        value={mode}
                                                        name="rejim-1"
                                                        checked={selectedGameMode === mode}
                                                        onChange={handleGameModeChange}
                                                    />
                                                    <div className="image-radio" id="images">
                                                        <img src="assets/img/check_.svg" alt="" />
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
                                                        className="rejim-check"
                                                        value={mode}
                                                        name="rejim-2"
                                                        checked={selectedGameMode === mode}
                                                        onChange={handleGameModeChange}
                                                    />
                                                    <div className="image-radio" id="images">
                                                        <img src="./img/check_.svg" alt="" />
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
                                                        className="rejim-check"
                                                        value={mode}
                                                        name="rejim-3"
                                                        checked={selectedGameMode === mode}
                                                        onChange={handleGameModeChange}
                                                    />
                                                    <div className="image-radio" id="images">
                                                        <img src="./img/check_.svg" alt="" />
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



                                {/* {['Соседи', 'Все', 'Классика', 'Ничья'].map((mode) => (
                                    <div className="rejim-igry-blocks" key={mode}>
                                        <div className="rejim-igry-block block-obvodka">
                                            <label className="checkbox-container">
                                                <input
                                                    type="radio"
                                                    className="rejim-check"
                                                    value={mode}
                                                    name="rejim-2"
                                                    checked={selectedGameMode === mode}
                                                    onChange={handleGameModeChange}
                                                />
                                                <div className="image-radio" id="images">
                                                    <img src="./img/check_.svg" alt="" />
                                                </div>
                                                <div className="icon-rejim">
                                                    <canvas id={mode.toLowerCase()}></canvas>
                                                    <div className="rej-text">{mode}</div>
                                                </div>
                                                <div className="checkmark"></div>
                                            </label>
                                        </div>
                                    </div>
                                ))} */}
                            </div>
                        </div>

                        <div className="col-igrok">
                            <p className="rejim-igry-p">Количество игроков</p>
                            <div className="col-igrok-blocks">
                                {[2, 3, 4].map((count) => (
                                    <div className="col-igrok-block btn-krug block-obvodka" key={count}>
                                        <label className="checkbox-container">
                                            <input
                                                type="radio"
                                                className="rejim-check"
                                                value={count}
                                                name="kolvo"
                                                checked={selectedPlayerCount === count.toString()}
                                                onChange={handlePlayerCountChange}
                                            />
                                            <div className="image-radio" id="images">
                                                <img src="./img/check_.svg" alt="" />
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
                                            onChange={handlePrivateGameChange}
                                        />
                                        <span className="checkmark block-obvodka"></span>
                                        <p>Приватная игра</p>
                                    </label>

                                    <input type="submit" className="create-kn block-obvodka" value="Создать" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            <footer className="footer">
                <div className="footer-wrapper">
                    <div className="container">
                        <div className="footer-menu">
                            <div className="footer-menu-item">
                                <a href="/">
                                    <canvas id="clubs"></canvas>
                                    <p className="punkt foot-men-p">Меню</p>
                                </a>
                            </div>
                            <div className="footer-menu-item">
                                <a href="/kvesty">
                                    <canvas id="spades"></canvas>
                                    <p className="punkt foot-men-p">Квесты</p>
                                </a>
                            </div>
                            <div className="footer-menu-item">
                                <a href="/otkrytye">
                                    <canvas id="hearts"></canvas>
                                    <p className="foot-men-p">Открытые</p>
                                </a>
                            </div>
                            <div className="footer-menu-item">
                                <a href="/sozdat-igru">
                                    <canvas id="diamond" className="active"></canvas>
                                    <p className="foot-men-p">Создать игру</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CreateGameForm;