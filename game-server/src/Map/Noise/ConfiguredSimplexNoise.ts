
import { SimplexNoise } from './SimplexNoise';

export interface ConfiguredSimplexNoiseOptions {
    octaves: SimplexOctaves[];
    retribution: number;
}

export interface SimplexOctaves {
    frequency: number;
}

export class ConfiguredSimplexNoise extends SimplexNoise {

    private octaves: SimplexOctaves[];
    private retribution: number;

    constructor( options: ConfiguredSimplexNoiseOptions ){
        super();

        this.octaves = options.octaves;
    }

    public noise( x: number, z: number ): number {
        var octaves = this.noise;
        var noise: number = 0;

        // octaves
        var i = 0, max = this.octaves.length;
        for( ; i < max ; i++ ){
            noise += super.noise( octaves[ i ].frequency * x, octaves[ i ].frequency * z );
        }

        // retribution
        noise = Math.pow( noise, this.retribution );

        return noise;
    }
}