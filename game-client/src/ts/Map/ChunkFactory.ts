
import { SimplexNoise } from 'simplex-noise';

import { Chunk } from './Chunk';
import { ConfiguredSimplexNoise, ConfiguredSimplexNoiseOptions, SimplexOctaves } from './Noise/ConfiguredSimplexNoise';

import { IPoint } from '../Interfaces/IPoint';

/*
    VoxelEngine.ChunkFactory.create({
        size: 50;
        origin: {
            x: 0,
            y: 0
        },
        noiseOptions: {
            octaves: [
                {
                    frequency: 1
                }
            ],
            retribution: 0.5
        }
    });
*/

export interface ChunkFactoryOptions {
    size: number;
    origin: {
        x: number;
        z: number;
    }
    noiseOptions: ConfiguredSimplexNoiseOptions;
}

export class ChunkFactory {

    public static create( options: ChunkFactoryOptions ){
        var simplexNoise = new ConfiguredSimplexNoise( options.noiseOptions );
        var chunk = new Chunk( options.size );

        var x = 0, maxX = options.size;
        for( ; x < maxX ; x++ ){

            var z = 0, maxZ = options.size;
            for( ; z < maxZ ; z++ ){

                var point: IPoint = {
                    x: x,
                    y: simplexNoise.noise( options.origin.x + x, options.origin.z + z ),
                    z: z
                };

                chunk.setPoint( x, z, point );
                
            }
        }

        return chunk;
    }

    public static noise() {
        return new SimplexNoise();
    }


}