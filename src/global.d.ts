
declare module '*.scss' {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}

interface Window {
    Telegram: {
        WebApp: {
            initDataUnsafe: { query_id: string;
                user?: {
                    id: number;
                    first_name: string;
                    last_name?: string;
                    username?: string;
                    language_code?: string;
                };
                receiver?: any;
                start_param?: string;
                auth_date: number;
                hash: string; };
            initDate: string;
            ready(callback: () => void): void;
            setViewSize(width: number, height: number): void;
            onEvent(eventType: string, callback: () => void): void;
        };
    };
}