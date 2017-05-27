
import { HeightMap } from './HeightMap';
import { HeightGenerator } from './HeightGenerator';
import { Point } from './Point';

export interface HeightMapFactoryOptions {

}

export enum HeightMapType {
    Heights = 0,
    Biomes = 1
}

export class HeightMapFactory {

    constructor( ){

    }

    public static generateHeightMap( width: number, depth: number, type: HeightMapType ){
        
        var heightMap = new HeightMap( { 
            width: width,
            depth: depth
        } );

        // initPoints

        var x = 0;
        for( ; x < width ; x++ ){
            var z = 0;
            for( ; z < depth ; z++ ){

                var y = HeightGenerator;

                heightMap.setPoint( x, y, z);
                
            }
        }

        return heightMap;
    }

    private static generateHeights( width: number, depth: number ): HeightMap {
        
    }

    private static generateBiomes( width: number, depth: number ){

    }
}