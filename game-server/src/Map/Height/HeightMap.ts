import { Point } from './Point';

export interface HeightMapOptions {
    width: number;
    depth: number;
}

export class HeightMap {

    private points: Array<Point>;

    private width: number;
    private depth: number;

    private size: number;

    private hasData: boolean;
    
    constructor( options: HeightMapOptions ){

        this.width = options.width;
        this.depth = options.depth;

        this.size = this.width * this.depth;
        this.points = new Array<Point>( this.size );

    }

    public getPoints(){
        return this.points;
    }

    public getPoint( x: number, y: number ){
        if( !this.hasData )
            return null;
        return this.points[ x / this.width * this.depth + y % this.depth ];
    }

    public setPoint( x: number, y: number, z: number ){
        this.points[ ( x / this.width * this.depth + ( y % this.depth ) ) ] = 
            new Point( {
                x: x,
                y: ( y ) ? y : -1,
                z: z
            } 
        );
    }
}