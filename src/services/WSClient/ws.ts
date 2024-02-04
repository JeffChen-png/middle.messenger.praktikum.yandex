import { WS_HOST } from '../../env';
import { TOptions } from './types';

class WSTransport {
  #webSockets: Record<string, WebSocket>;

  constructor() {
    this.#webSockets = {};
  }

  connect = (url: string, options: TOptions = {}) => {
    let webSocket: WebSocket;

    if (this.#webSockets[url]) {
      webSocket = this.#webSockets[url];
    } else {
      webSocket = new WebSocket(WS_HOST + url);
    }

    const onOpen = (event: WebSocketEventMap['open']) => {
      options.onOpen?.(event);
    };

    const onMessage = (event: WebSocketEventMap['message']) => {
      options.onMessage?.(event);
    };

    const onError = (event: WebSocketEventMap['error']) => {
      options.onError?.(event);
    };

    const onClose = (event: WebSocketEventMap['close']) => {
      options.onClose?.(event);

      delete this.#webSockets[url];
    };

    setInterval(() => webSocket.send(JSON.stringify({ type: 'ping' })), 5000);

    webSocket.addEventListener('open', onOpen); // соединение установлено
    webSocket.addEventListener('message', onMessage); // пришло новое сообщение
    webSocket.addEventListener('error', onError); // ошибка
    webSocket.addEventListener('close', onClose); // сокет закрылся
  };

  disconnect = (url: string) => {
    const webSocket = this.#webSockets[url];

    if (!webSocket) return;

    webSocket.close(1000, 'Disconnect');
  };
}

export const wsClient = new WSTransport();
