"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Chunk {
    constructor(size) {
        this.size = size;
    }
    getPoint(x, y) {
        return this.points[this.size * y + x];
    }
    getPoints() {
        return this.points;
    }
    setPoint(x, y, value) {
        this.points[this.size * y + x] = value;
    }
}
exports.Chunk = Chunk;
