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
            ready(callback: () => void): void;
            setViewSize(width: number, height: number): void;
            onEvent(eventType: string, callback: () => void): void;
        };
    };
}