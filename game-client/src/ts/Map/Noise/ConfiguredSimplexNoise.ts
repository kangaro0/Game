
var SimplexNoise = require('simplex-noise'),

export interface ConfiguredSimplexNoiseOptions {
    octaves: SimplexOctaves[];
    redistribution: number;
}

export interface SimplexOctaves {
    frequency: number;
}

export class ConfiguredSimplexNoise {

    private octaves: SimplexOctaves[];
    private redistribution: number;

    private simplexNoise;

    constructor( options: ConfiguredSimplexNoiseOptions ){

        this.octaves = options.octaves;
        this.redistribution = options.redistribution;

        this.simplexNoise = new SimplexNoise( Math.random );
    }

    public noise( x: number, z: number ): number {
        var octaves = this.octaves;
        var noise: number = 0;

        // octaves
        var i = 0, max = this.octaves.length;
        for( ; i < max ; i++ ){
            noise += this.simplexNoise.noise2D( octaves[ i ].frequency * x, octaves[ i ].frequency * z );
        }

        // retribution
        noise = Math.pow( noise, this.redistribution );

        return noise;
    }
}