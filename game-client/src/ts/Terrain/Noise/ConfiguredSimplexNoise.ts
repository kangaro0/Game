
var SimplexNoise = require('simplex-noise');
var Alea = require('alea');

import { INoiseOptions, IOctaveOptions } from '../../Interfaces/IMapGeneratorOptions';

export class ConfiguredSimplexNoise {

    private octaves: IOctaveOptions[];
    private redistribution: number;
    private maxHeight: number;
    private step: number;

    private simplexNoise;

    constructor( options: INoiseOptions ){

        this.octaves = options.octaves;
        this.redistribution = options.redistribution;
        this.maxHeight = options.maxHeight;
        this.step = options.step;

        this.simplexNoise = new SimplexNoise( new Alea( options.seed ) );
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

        // normalize to [ 0, 1 ] and then to [ 0, maxHeight ];
        noise = ( noise + 1 ) / 2 * this.maxHeight;
        
        noise = this.roundTo( noise, this.step );

        return noise;
    }

    private roundTo( value: number, step: number ){

        return Math.round( value / step ) * step;
    }
}