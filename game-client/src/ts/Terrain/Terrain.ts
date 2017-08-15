
import { Chunk } from './Chunk';
import { ConfiguredSimplexNoise } from './Noise/ConfiguredSimplexNoise';

import { ITerrainOptions } from '../Interfaces/ITerrainOptions';

export class Terrain {

    private options: ITerrainOptions;

    private surfaceChunks: Array<Chunk>;
    private surfaceNoise: ConfiguredSimplexNoise;

    constructor( options: ITerrainOptions ){
        this.options = options;
        
        if( options.surface )
            this.surfaceNoise = new ConfiguredSimplexNoise( this.options.surface );
    }

    public getChunk( id: number, offsetX: number, offsetZ: number ): Chunk {
        var chunk = this.surfaceChunks.find( ( item ) => item.getId() === id )

        if( chunk )
            return chunk;

        return this.createChunk( id, offsetX, offsetZ );
    }

    public deleteChunk( id: number ){
        delete this.surfaceChunks[ id ];
    }

    public createChunk( id: number, offsetX: number, offsetZ: number ): Chunk {
        let chunk = new Chunk( id, this.options.chunkSize );

        var z = 0, maxZ = Math.sqrt( this.options.chunkSize );
        for( ; z < maxZ ; z++ ){

            var x = 0, maxX = maxZ;
            for( ; x < maxX ; x++ ){

                if( this.surfaceNoise )
                    chunk.setSurfacePoint( x, z, {
                        x: x,
                        y: this.surfaceNoise.noise( x + offsetX, z + offsetZ ),
                        z: z 
                    });
            }
        }

        return chunk;
    }

    

    


}