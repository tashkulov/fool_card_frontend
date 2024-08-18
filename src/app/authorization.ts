import {store} from "./pages/play-game/ui/store.ts";
import axios from "axios";

export const hasRegistered = {
    current: false
}

export const hasLoggedIn = {
    current: false
}

if (window.Telegram && window.Telegram.WebApp) {
    const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;


    if (initDataUnsafe && initDataUnsafe.user) {
        const user = initDataUnsafe.user;
        store.getState().user = user;
        console.log(store.getState().user);

        const avatarUrl = `https://t.me/i/userpic/320/${user.id}.jpg`;

        // Проверяем наличие аватара
        fetch(avatarUrl)
            .then(response => {
                if (response.ok) {
                    console.log('User Avatar URL:', avatarUrl);
                } else {
                    console.log('Avatar not found, using placeholder.');
                    // Используем запасное изображение
                    const placeholderUrl = 'URL_TO_YOUR_PLACEHOLDER_IMAGE';
                    console.log('User Avatar URL:', placeholderUrl);
                }
            })
            .catch(error => {
                console.error('Error fetching avatar:', error);
            });
    }
}

export const RegisterUser = async () => {
    try {
        if (window.Telegram && window.Telegram.WebApp) {
            const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
            console.log(initDataUnsafe.user.username);

            if (initDataUnsafe && initDataUnsafe.user) {
                const userData = {
                    "telegram_id": initDataUnsafe.user.id.toString() || "unknown",
                    "username": initDataUnsafe.user.username || "unknown",
                    "language": "ru_RU",
                    "invited_by": null
                };

                // Отправка данных на сервер
                const response = await axios.post('ws://138.68.100.172:8080', userData);
                console.log('Ответ:---------------', response);

                hasRegistered.current = true

                localStorage.setItem("authorization", response.data.Authorization)
                console.log(localStorage.getItem("authorization"));
            } else {
                console.error('Не удалось получить данные пользователя');
            }
        } else {
            console.error('Telegram Web App SDK не загружен');
        }
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
    }
};

export const LoginUser = async () => {
    try {
        if (window.Telegram && window.Telegram.WebApp) {
            const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;

            if (initDataUnsafe && initDataUnsafe.user) {
                const userData = {
                    "telegram_id": initDataUnsafe.user.id.toString()
                };

                // Отправка данных на сервер
                const response = await axios.post('ws://138.68.100.172:8080', userData);
                console.log('Ответ:---------------', response);

                hasLoggedIn.current = true

                localStorage.setItem("authorization", response.data.Authorization)
                console.log(localStorage.getItem("authorization"));
            } else {
                console.error('Не удалось получить данные пользователя');
            }
        } else {
            console.error('Telegram Web App SDK не загружен');
        }
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
    }
};

