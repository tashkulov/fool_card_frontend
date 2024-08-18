import axios from "axios";

export const hasRegistered = {
    current: false
}

export const hasLoggedIn = {
    current: false
}

// Функция регистрации пользователя
export const RegisterUser = async () => {
    try {
        if (window.Telegram && window.Telegram.WebApp) {
            const initData = window.Telegram.WebApp.initDate;
            console.log("========================================", initData)

            if (initData) {
                const response = await axios.post('http://138.68.100.172:8080/receiver/authorize', initData);
                console.log('Ответ:---------------', response);

                hasRegistered.current = true;

                // Сохраняем токен авторизации в localStorage
                localStorage.setItem("authorization", response.data.Authorization);
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
            const initData = window.Telegram.WebApp.initDate;
            console.log("========================================", initData)

            if (initData) {
                const response = await axios.post('http://138.68.100.172:8080/receiver/authorize', initData);
                console.log('Ответ:---------------', response);

                hasLoggedIn.current = true;

                // Сохраняем токен авторизации в localStorage
                localStorage.setItem("authorization", response.data.Authorization);
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
