import axios from "axios";

export const hasRegistered = {
    current: false
};

export const hasLoggedIn = {
    current: false
};

export const RegisterUser = async () => {
    const initData = window.Telegram.WebApp.initData;
    console.log("========================================", initData);

    try {
        if (window.Telegram && window.Telegram.WebApp) {
            const initData = window.Telegram.WebApp.initData;
            console.log("========================================", initData);

            const data = {
                init_data: initData
            }

            if (initData) {
            const response = await axios.post('https://foolcard2.shop/receiver/authorize', data,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                },
            );
            console.log('Ответ:---------------', response.data);

            hasRegistered.current = true;

            // Сохраняем токен авторизации в localStorage
            localStorage.setItem("authorization", response.data);
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

// Функция авторизации пользователя
export const LoginUser = async () => {
    try {
        if (window.Telegram && window.Telegram.WebApp) {
            const initData = window.Telegram.WebApp.initData;
            console.log("========================================", initData);

            if (initData) {
                const response = await axios.post('https://foolcard2.shop/coordinator/authorize', initData);
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
