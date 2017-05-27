
import { SimplexNoise } from '../Noise/SimplexNoise';
import { HeightMapType } from './HeightMapFactory';

export interface HeightGeneratorOptions {
    frequency: number;
}

export class HeightGenerator {

    private noise: SimplexNoise;

    private frequency: number;
    private 
    
    constructor( options: HeightGeneratorOptions ){
        this.noise = new SimplexNoise();
    }

    public getHeight( heightFunction: number ){
        
    }

    public generateHeights() {
        var heights = new Array<number>( width * height );
        var perlin = new ImprovedNoise(),
		
        var quality = 2, z = Math.random() * voxelSize;

		for ( var j = 0; j < 4; j ++ ) {

			if ( j == 0 ) for ( var i = 0; i < this.size; i ++ ) this.heights[ i ] = 0;

			for ( var i = 0; i < this.size; i ++ ) {

				var x = i % width, y = ( i / width ) | 0;
                this.heights[ i ] += perlin.noise( x / quality, y / quality, z ) * quality;
			}

			quality *= 4
		}
    }

}