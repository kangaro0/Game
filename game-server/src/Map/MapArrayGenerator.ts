
import { MapArray } from './MapArray';

export interface MapArrayGeneratorOptions {
    width: number;
    depth: number;
}

export class MapArrayGenerator {

    private map: Array<Array<number>>;

    private options: MapArrayGeneratorOptions;

    constructor( options: MapArrayGeneratorOptions ){
        this.options = options;
    }

    private generate(){
        var depth = this.options.depth;
        var width = this.options.width;
        var size = depth * width;

        var x = 0; 
        for( ; x < depth ; x++ ){
            var z = 0;
            for( ; z < width ; z++ ){

                this.map[ x ][ z ] = 1;
            }
        }
    }
}