"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Map {
    constructor(size) {
        this.size = size;
    }
    getChunk(x, y) {
        return this.chunks[this.size * y + x];
    }
    setChunk(x, y) {
        this.chunks[this.size * y + x];
    }
}
exports.Map = Map;
