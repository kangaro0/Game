"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SimplexNoise_1 = require("./SimplexNoise");
class ConfiguredSimplexNoise extends SimplexNoise_1.SimplexNoise {
    constructor(options) {
        super();
        this.octaves = options.octaves;
    }
    noise(x, z) {
        var octaves = this.noise;
        var noise = 0;
        var i = 0, max = this.octaves.length;
        for (; i < max; i++) {
            noise += super.noise(octaves[i].frequency * x, octaves[i].frequency * z);
        }
        noise = Math.pow(noise, this.retribution);
        return noise;
    }
}
exports.ConfiguredSimplexNoise = ConfiguredSimplexNoise;
