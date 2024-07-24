import './play-game.css';

// import icon from '../../img/kvest2.svg';
import card1 from '../img/card1.svg';
import card2 from '../img/card2.svg';
import card3 from '../img/card3.svg';
import GamePlay from "../img/Gameplay_Avatar.svg"
import coins from "../img/coins.svg"
import arrow from "../img/Arrow1.svg"

const PlayGame = () => {

    return (
        <>
            <div className="wrapper">
               
                <div className="plays">
                    <section className="play-header">
                        <div className="container">
                            <div className="play-header-wrapper">
                                <div className="play-header-block">
                                    <a className="play-header-back block-obvodka">
                                        <img src={arrow} alt="" />
                                    </a>
                                    <div className="play-header-coin">
                                        <img src={coins} alt="" />
                                        <p>4K</p>
                                    </div>
                                </div>
                                <div className="play-header-rejim block-obvodka">
                                    <img src={card1} alt="" />
                                    <img src={card2} alt="" />
                                    <img src={card3} alt="" />
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="play-header-polosa "></div>
                    <div className="play-header-polosa "></div>
                </div>
                <div className="main play-wrapper play-krug">
                    <div className="main-wrapper-plays">
                        <div className="container">
                            <div className="wrapper-plays-header"></div>
                            <div className="wrapper-plays-game">
                                <div className="players-blocks ">
                                    <div className="player-block user-dumaet footer-ava-wp ">
                                        <img src={GamePlay} alt="" />
                                    </div>
                                    <div className="players-flex">
                                        <div className="player-block footer-ava-wp">
                                            <img src={GamePlay} alt="" />
                                        </div>
                                        <div className="player-block footer-ava-wp">
                                            <img src={GamePlay} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="play-footer">
                    <div className="play-footer-ava">
                        <div className="footer-ava-roga">
                            <div className="footer-ava-wp">
                                <img src="../img/Gameplay_Avatar.svg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="play-footer-wrap">
                        <div className="play-footer-btn block-obvodka" id="canvas">
                            <p>Бито</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default PlayGame;
