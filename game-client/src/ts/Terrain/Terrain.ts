
import { Map } from './Map';
import { Chunk } from './Chunk';
import { ChunkFactory } from './ChunkFactory';

export interface TerrainOptions {
    mapSize: number;
    chunkSize: number;
}

export interface MapOptions {
    mapSize: number;
    chunkSize: number;
}

export class Terrain {

    constructor(  ){

    }

    public createMap( options: MapOptions ): Map {
        var map = new Map( options.mapSize );

        // create chunks
        for(  )
    }


}