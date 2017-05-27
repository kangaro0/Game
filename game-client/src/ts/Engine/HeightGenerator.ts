
var SimplexNoise = require('simplex-noise');
import { Noise } from './Interfaces/Common';
import { ImprovedNoise } from './ImprovedNoise';

class HeightGenerator {
    private simplexNoise: Noise;
    private heights: number[];

    private size: number;
    private width: number;
    private height: number;

    constructor( width, height ){
        this.simplexNoise = new SimplexNoise( );

        this.heights = [];

        this.size = 0;

    }

    /*
    public generateHeights( offset_x, offset_z ): Array<Array<number>>{
        var chunkSize = this.chunkSize;
        var heights = new Array<number[]>( chunkSize );
        for( var i = 0; i < chunkSize ; i++ )
            heights[ i ] = new Array<number>( chunkSize );

        var x = 0;
        for( ; x < chunkSize ; x++ ){
            var z = 0;
            for( ; z < chunkSize ; z++ ){

                var real_x = offset_x + x, real_z = offset_z + z;
                heights[ x ][ z ] = this.getHeight( real_x, real_z );
            }
        }

        return heights;
    }
    // */

    private generateHeights( width: number , height: number, voxelSize: number ): void {
        this.heights = new Array<number>( width * height );
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

    public getY( x: number, y: number ): number{
        
        return( this.heights[ x + z * ])
    }

    // wrong place
    /*
    public generateHeightMap( context: CanvasRenderingContext2D ): ImageData {

        var low = this.low, high = this.high;
        var imageData = context.createImageData( this.chunkSize, this.chunkSize );

        var current = 0, max = this.generatedHeights.length;
        for( ; current < max ; current++ ){
            var index = current * 4;

            var percent = ( high - ( this.generatedHeights[ current ] - low ) ) / 100;
            imageData.data[ index ] = percent * 255;      // red 
            imageData.data[ index + 1] =  percent * 255;  // green
            imageData.data[ index + 2] = percent * 255;   // blue
            imageData.data[ index + 3] = 255;             // alpha
        }

        return imageData;
    }
    // */

    public getY( x: number, y: number ): number {
        var height = 0;

        height += this.simplexNoise.noise2D( this.scale * x, this.scale * y);

        height = Math.floor( ( ( height + 1 ) / 2 ) * 10 );

        return height;
    }
    // */

    /*
    private getHeight( x: number, y: number ): number{
        var height = 0;
        var maxAmplification = 0;
        var amplification = 1;
        var frequency = this.scale;
        var low = this.low, high = this.high;

        var current = 0, max = this.octaves;
        for( ; current < max ; current++ ){
            
            height += this.simplexNoise.noise2D( frequency * x, frequency * y, ) * amplification;
            
            maxAmplification += amplification;
            amplification *= this.persistence;
            frequency *= 1; 
        }

        height /= maxAmplification;
        height = height * ( high - low ) / 2 + ( high + low ) / 2;
        height = Math.floor( height / 10 );

        return height;
    }
    // */

}

export { HeightGenerator };