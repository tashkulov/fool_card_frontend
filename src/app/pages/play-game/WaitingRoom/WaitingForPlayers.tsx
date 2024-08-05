// src/components/WaitingForPlayers.js
import './style.css';


const WaitingForPlayers = ({ onReadyClick }: { onReadyClick: () => void }) => {
    return (
        <div className="waiting-screen">
            <p>Ожидание других игроков...</p>
            <button className="play-footer-btn ready-button" onClick={onReadyClick}>готов</button>
        </div>
    );
};

export default WaitingForPlayers;
