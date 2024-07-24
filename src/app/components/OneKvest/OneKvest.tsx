import React, { useState } from 'react';
import './OneKvest.css';
import galochka from './img/galochka.svg';

interface OneKvestProps {
    image: string;
    headText: string;
    description: string;
    buttonText: string;
}

const OneKvest: React.FC<OneKvestProps> = ({ image, headText, description, buttonText }) => {
    const [completed, setCompleted] = useState(false);

    const handleButtonClick = () => {
        setCompleted(true);
    };

    return (
        <div className="one-kvest">
            <div className="mainContent">
                <img src={image} alt={headText} className="image" />
                <div className='text'>
                    <h2 className="headText">{headText}</h2>
                    <p className="description">{description}</p>
                </div>
            </div>
            <button className={`kvestButton ${completed ? 'completed' : ''}`} onClick={handleButtonClick}>
                {completed ? <img src={galochka} alt="Completed" className="galochka" /> : <span className="buttonText">{buttonText}</span>}
            </button>
        </div>
    );
};

export default OneKvest;
