"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Chunk_1 = require("./Chunk");
const ConfiguredSimplexNoise_1 = require("./Noise/ConfiguredSimplexNoise");
class ChunkFactory {
    create(options) {
        var simplexNoise = new ConfiguredSimplexNoise_1.ConfiguredSimplexNoise(options.noiseOptions);
        var chunk = new Chunk_1.Chunk(options.size);
        var x = 0, maxX = options.size;
        for (; x < maxX; x++) {
            var z = 0, maxZ = options.size;
            for (; z < maxZ; z++) {
                var point = {
                    x: x,
                    y: simplexNoise.noise(options.origin.x + x, options.origin.z + z),
                    z: z
                };
                chunk.setPoint(x, z, point);
            }
        }
    }
}
exports.ChunkFactory = ChunkFactory;
