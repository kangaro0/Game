
import { MapArrayGenerator } from './MapArrayGenerator';

export interface MapGeneratorOptions {
    map: {
        width: number;
        height: number;
    };
    chunk: {
        width: number;
        height: number;
    }
    voxel: {
        width: number;
        height: number;
        depth: number;
    }
}

export class MapGenerator {

    private options: MapGeneratorOptions

    private mapArrayGenerator: MapArrayGenerator;

    constructor( options: MapGeneratorOptions ){

        this.options = options;
        
    }
}