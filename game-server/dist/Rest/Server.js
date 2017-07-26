"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const indexRoute = require("./Routes/Index");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.config();
    }
    config() {
    }
    setupRoutes() {
        let router = express.Router();
        var index = new indexRoute.Route.Index();
        router.get('/', index.index.bind(index.index));
        this.app.use(router);
    }
}
exports.Server = Server;
