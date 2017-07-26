
import { IPoint } from '../Interfaces/IPoint';

export class Chunk {

    private size: number;
    private points: IPoint[];

    constructor( size: number ){
        this.size = size;
    }

    getPoint( x: number, y: number ){
        return this.points[ this.size * y + x ];
    }

    getPoints( ): IPoint[] {
        return this.points;
    }

    setPoint( x: number, y: number, value: IPoint ){
        this.points[ this.size * y + x ] = value;
    }
}