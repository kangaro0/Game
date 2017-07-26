"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IncomingWebSocketMessageType;
(function (IncomingWebSocketMessageType) {
    IncomingWebSocketMessageType[IncomingWebSocketMessageType["NEW_CONNECTION"] = 0] = "NEW_CONNECTION";
    IncomingWebSocketMessageType[IncomingWebSocketMessageType["DATA"] = 1] = "DATA";
})(IncomingWebSocketMessageType = exports.IncomingWebSocketMessageType || (exports.IncomingWebSocketMessageType = {}));
class IncomingWebSocketMessage {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
    getType() {
        return this.type;
    }
    getData() {
        return this.data;
    }
}
exports.IncomingWebSocketMessage = IncomingWebSocketMessage;
