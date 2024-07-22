
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home-page/home-page.tsx';
import PlayGame from "./pages/play-game/play-game.tsx";
import NewGame from "./pages/new-game/new-game.tsx";

const App: React.FC = () => {
    const user = {
        photo_url: 'URL_TO_PHOTO',
        first_name: 'Имя пользователя',
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage user={user} />} />
                <Route path="/in-game" element={<PlayGame  />} />
                <Route path="/new-game" element={<NewGame />} />
            </Routes>
        </Router>
    );
};

export default App;
