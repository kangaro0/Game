"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WebSocketServer {
    constructor() {
        this.incomingMessageQueue = new MessageQueue();
    }
    start() {
        this.server = require('http').createServer();
        this.io = require('io')(this.server);
        this.io.on('connection', (client) => {
        });
    }
    pushIncoming(message) {
        this.incomingMessageQueue;
    }
    popIncoming() {
        if (this.incomingMessageQueue.hasNext())
            return { valid: true, message: this.incomingMessageQueue.pop() };
        return { valid: false };
    }
    pushOutgoing(message) {
        this.outgoingMessageQueue.push(message);
    }
    popOutgoing() {
        if (!this.outgoingMessageQueue.hasNext())
            return null;
        return this.outgoingMessageQueue.pop();
    }
    register(observer) {
        this.observers.push(observer);
    }
    unregister(observer) {
        var indexOf = this.observers.indexOf(observer);
        if (indexOf != -1)
            this.observers.splice(indexOf, 1);
    }
    notify() {
        var current = 0, max = this.observers.length;
        for (; current < max; current++)
            this.observers[current].receive();
    }
}
exports.WebSocketServer = WebSocketServer;
