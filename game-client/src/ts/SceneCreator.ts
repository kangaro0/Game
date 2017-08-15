
import { Terrain } from './Terrain/Terrain';
import { Chunk } from './Terrain/Chunk';

import { IPoint } from './Interfaces/IPoint';
import { ISceneCreatorOptions } from './Interfaces/ISceneCreatorOptions';

export class SceneCreator {

    private options: ISceneCreatorOptions;

    private lastPlayerPosition: IPoint;
    private lastChunkPosition: IPoint;

    private scene: THREE.Scene;
    private terrain: Terrain;

    private loadedChunks: Array<Chunk>;

    constructor( scene: THREE.Scene, playerPosition: IPoint, options: ISceneCreatorOptions ){
        this.options = options;
        this.scene = scene;

        this.lastPlayerPosition = playerPosition;

        if( options.terrain ){
            this.terrain = new Terrain( options.terrain );
            this.loadedChunks = new Array<Chunk>( options.terrain.chunkSize * options.terrain.chunkSize );
            this.create( playerPosition, true );
        }
    }

    public create( playerPosition: IPoint, first: boolean = false ){
        // ifInLastChunk -> don't reload chunks
        if( this.isInLastChunk( playerPosition.x, playerPosition.z ) && !first )
            return;

        let mapSize = this.options.terrain.mapSize;
        let chunkSize = this.options.terrain.chunkSize;

        let chunkIndex = 0;
        let z = 0, maxZ = 2 * this.options.scene.radius + 1;
        for( ; z < maxZ ; z++ ){

            let x = 0, maxX = maxZ; 
            for( ; x < maxX ; x++, chunkIndex++ ){

                let a = Math.floor( playerPosition.x / chunkSize );
                let b = Math.floor( playerPosition.z / chunkSize );
                

                let id = a + chunkSize * b;

                this.loadedChunks[ id ] = this.terrain.getChunk( id, chunkSize * a, chunkSize * b );


            }
        }
    }

    private isInLastChunk( x: number, z: number ): boolean {
        let chunkSize = this.options.terrain.chunkSize;

        let lastShiftX = Math.floor( this.lastPlayerPosition.x / chunkSize );
        let lastShiftZ = Math.floor( this.lastPlayerPosition.z / chunkSize );

        let currentShiftX = Math.floor( x / chunkSize );
        let currentShiftZ = Math.floor( z / chunkSize );

        if( lastShiftX === currentShiftX && lastShiftZ === currentShiftZ )
            return true;
        return false;
    }

}