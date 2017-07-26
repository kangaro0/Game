"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WebSocketConnection {
    constructor() {
        this.observers = new Array();
    }
    connect(url) {
        return new Promise((resolve, reject) => {
            if (url == null)
                reject(new Error('WebSocketConnection: No url specified.'));
            this.webSocket = new WebSocket(url);
            this.webSocket.binaryType = 'arraybuffer';
            this.webSocket.onopen = (event) => {
                resolve();
            };
            this.webSocket.onmessage = (event) => {
                this.notify(new Uint8Array(event.data));
            };
            this.webSocket.onerror = (event) => {
                reject(new Error('WebSocketConnection: WebSocket -> onError'));
            };
            this.webSocket.onclose = (event) => {
                reject(new Error('WebSocketConnection: WebSocket -> onClose'));
            };
        });
    }
    send(data) {
        if (this.isConnected())
            this.webSocket.send(data);
    }
    disconnect() {
        this.webSocket.close();
    }
    isConnected() {
        return this.webSocket.readyState == WebSocket.OPEN;
    }
    register(observer) {
        this.observers.push(observer);
    }
    unregister(observer) {
        var index = this.observers.indexOf(observer);
        if (index != -1)
            this.observers.splice(index, 1);
    }
    notify(data) {
        var current = 0, max = this.observers.length;
        for (; current < max; current++) {
            this.observers[current].receive(data);
        }
    }
}
exports.WebSocketConnection = WebSocketConnection;
