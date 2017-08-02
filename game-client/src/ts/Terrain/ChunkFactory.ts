
import { SimplexNoise } from 'simplex-noise';

import { Chunk } from './Chunk';
import { ConfiguredSimplexNoise } from './Noise/ConfiguredSimplexNoise';

import { IPoint } from '../Interfaces/IPoint';
import { INoiseOptions } from '../Interfaces/IMapGeneratorOptions';

export class ChunkFactory {

    private options: INoiseOptions;
    private simplexNoise: ConfiguredSimplexNoise;

    constructor( options: INoiseOptions ){
        
    }

    public create( ){
        var chunk = new Chunk( options.size );

        var z = 0, maxZ = options.size;
        for( ; z < maxZ ; z++ ){

            var x = 0, maxX = options.size;
            for( ; x < maxX ; x++ ){

                var point: IPoint = {
                    x: x,
                    y: this.simplexNoise.noise( options.origin.x + x, options.origin.z + z ),
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