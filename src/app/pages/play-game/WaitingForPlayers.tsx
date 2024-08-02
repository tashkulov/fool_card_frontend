// src/components/WaitingForPlayers.js
import './style.css';

const WaitingForPlayers = ({ onReadyClick}) => {

    return (
        <div className="waiting-screen">
            <h2>Ожидание других игроков...</h2>
            <button className="play-footer-btn ready-button" onClick={onReadyClick}>
                Готов
            </button>
        </div>
    );
};

export default WaitingForPlayers;
