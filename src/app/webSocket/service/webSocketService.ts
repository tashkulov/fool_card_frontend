class WebSocketService {
    private socket: WebSocket | null = null;

    connect(url: string) {
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            console.log('WebSocket connected');
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.handleMessage(data);
        };

        this.socket.onclose = () => {
            console.log('WebSocket disconnected');
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    private handleMessage(data: any) {
        // Обработка полученных сообщений
    }

    send(event: string, payload: any) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ event, ...payload }));
        } else {
            console.error('WebSocket is not connected');
        }
    }
}

export const websocketService = new WebSocketService();
