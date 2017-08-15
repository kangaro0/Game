
import { IPoint } from '../Interfaces/IPoint';

export class Chunk {

    private id: number;
    private size: number;
 
    private surface: IPoint[];

    constructor( id: number, size: number ){
        this.id = id;
        this.size = size;
        this.surface = new Array<IPoint>( size * size );
    }

    getId() { return this.id; }

    getSurfacePoint( x: number, y: number ){
        return this.surface[ this.size * y + x ];
    }

    getSurfacePoints( ): IPoint[] {
        return this.surface;
    }

    setSurfacePoint( x: number, z: number, value: IPoint ){
        this.surface[ this.size * x + z ] = value;
    }
}