
export interface ChunkOptions{
    width: number;
    depth: number;
}

export class Chunk {

    private width: number;
    private depth: number;

    private size: number;

    constructor( options: ChunkOptions ){

        this.width = options.width;
        this.depth = options.depth;

        this.size = options.width * options.depth;
    }
}