import { Chunk } from './Chunk';

export class Map {

    private size: number;
    private chunks: Chunk[];

    constructor( size: number ){
        this.size = size;
    }

    getChunk( x: number, y: number ){
        return this.chunks[ this.size * y + x ];
    }

    setChunk( x: number, y: number ){
        this.chunks[ this.size * y + x ];
    }

    
}