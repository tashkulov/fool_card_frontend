declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initDataUnsafe: {
          user: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            // Другие свойства пользователя
          };
          // Другие свойства initDataUnsafe
        };
        // Другие свойства и методы WebApp
      };
    };
  }
}
export {};