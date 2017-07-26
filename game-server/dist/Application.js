"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("./Rest/Server");
class Application {
    static Server() {
        return Server_1.Server().bootstrap();
    }
}
exports.Application = Application;
