
import { Chunk } from './Chunk';
import { HeightMap } from './Height/HeightMap';
import { HeightMapFactory } from './Height/HeightmapFactory';

export interface MapOptions {
    map: {
        width: number;
        depth: number;
    }
    chunk: {
        width: number;
        depth: number;
    },

}

export class Map {

    private chunks: Array<Chunk>;

    private heightMap: HeightMap;

    private biomeMap: HeightMap;

    constructor( options: MapOptions ){

        this.chunks = new Array<Chunk>( options.map.width * options.map.depth );

        this.heightMap = this.heightMapFactory
        this.heightMap = new HeightMap({
            width: options.map.width * options.chunk.width,
            depth: options.map.depth * options.chunk.depth
        });
        this.biomeMap = new HeightMap({
            width: options.map.width * options.chunk.width,
            depth: options.map.depth * options.chunk.depth
        });
    }


}