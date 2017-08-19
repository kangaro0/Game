
import { Terrain } from './Terrain/Terrain';
import { Chunk } from './Terrain/Chunk';

import { IPoint } from './Interfaces/IPoint';
import { ISceneCreatorOptions } from './Interfaces/ISceneCreatorOptions';

export class SceneCreator {

    private options: ISceneCreatorOptions;

    private lastPlayerPosition: IPoint;
    private currentChunk: Chunk;

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
        let radius = this.options.scene.radius;

        let currentRadius = 0;
        for( ; currentRadius <= radius ; currentRadius++ ){

            let center = new THREE.Vector2( Math.floor( playerPosition.x / chunkSize ) * chunkSize + 1/2 * chunkSize, Math.floor( playerPosition.z / chunkSize ) * chunkSize + 1/2 * chunkSize );
            let next = center.clone();
            next.setComponent( 0, next.x + chunkSize * currentRadius );

            let angle = ( 90 * Math.PI / 180 ) / ( currentRadius + 1 );

            let dirCount = 0, maxDir = 4 + 4 * currentRadius;
            for( ; dirCount < maxDir ; dirCount++ ){

                let x = Math.floor( next.x / chunkSize );
                let z = Math.floor( next.y / chunkSize );
                let id = z * chunkSize + x;

                if( this.loadedChunks.find( ( item ) => item.getId() === id ) )
                    continue;

                id > -1 ? this.loadedChunks.push( this.terrain.getChunk( id, x * chunkSize, z * chunkSize ) ) : "";

                if( currentRadius === 0 )
                    break;

                next.rotateAround( center, angle );
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