import { Vector4 } from './Vector4';

export class Matrix4 {

    private arr: Float32Array;

    constructor( arr: Array<number> ){
        this.arr = new Float32Array( 16 );
        this.arr[ 0 ] = arr[ 0 ];
        this.arr[ 4 ] = arr[ 1 ];
        this.arr[ 8 ] = arr[ 2 ];
        this.arr[ 12 ] = arr[ 3 ];
        this.arr[ 1 ] = arr[ 4 ];
        this.arr[ 5 ] = arr[ 5 ];
        this.arr[ 9 ] = arr[ 6 ];
        this.arr[ 13 ] = arr[ 7 ];
        this.arr[ 2 ] = arr[ 8 ];
        this.arr[ 6 ] = arr[ 9 ];
        this.arr[ 10 ] = arr[ 10 ];
        this.arr[ 14 ] = arr[ 11 ];
        this.arr[ 3 ] = arr[ 12 ];
        this.arr[ 7 ] = arr[ 13 ];
        this.arr[ 11 ] = arr[ 14 ];
        this.arr[ 15 ] = arr[ 15 ];
    }

    // Getter
    public get( i: number ): number {
        return this.arr[ i ];
    }

    public getXY( x: number, y: number ){
        return this.arr[ x * 4 + y ];
    }

    public getBuffer(){
        return this.arr;
    }

    // Setter
    public set( i: number, v: number ): void {
        this.arr[ i ] = v;
    }

    public setXY( x: number, y: number, v: number ){
        this.arr[ x * 4 + y ] = v;
    }

    // Math
    public add( m: Matrix4 ): Matrix4 {
        for( let i = 0 ; i < 16 ; i++ )
            this.set( i, this.get( i ) + m.get( i ) );

        return this;
    }

    public multiply( m: Matrix4 ): Matrix4 {

        return this;
    }

    public multiplyScalar( s: number ){
        for( let i = 0 ; i < 16 ; i++ )
            this.set( i, this.get( i ) * s );
    }

    public multiplyVector( v: Vector4 ): Vector4 {
        let vec = new Vector4( 0,0,0,1 );

        for( let i = 0 ; i < 3 ; i++ ){
            vec.setX( vec.getX() + this.getXY( i, 0 ) * v.get( i ) );
            vec.setY( vec.getY() + this.getXY( i, 1 ) * v.get( i ) );
            vec.setZ( vec.getZ() + this.getXY( i, 2 ) * v.get( i ) );
        }

        return vec;
    }

    public transpose(){
        let tmp = this.get( 1 );
        this.set( 1, this.get( 4 ) );
        this.set( 4, tmp );
        tmp = this.get( 2 );
        this.set( 2, this.get( 8 ) );
        this.set( 8, tmp );
        tmp = this.get( 3 );
        this.set( 3, this.get( 12 ) );
        this.set( 12, tmp );
        tmp = this.get( 6 );
        this.set( 6, this.get( 9 ) );
        this.set( 9, tmp );
        tmp = this.get( 7 );
        this.set( 7, this.get( 13 ) );
        this.set( 13, tmp );
        tmp = this.get( 11 );
        this.set( 11, this.get( 14 ) );
        this.set( 14, tmp );
    }
    
    // Types
    public static identity(){
        let arr = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        return new Matrix4( arr );
    }

    // Debug
    public print(){
        console.log( this.arr[ 0 ] + ' ' + this.arr[ 4 ] + ' ' + this.arr[ 8 ] + ' ' + this.arr[ 12 ] );
        console.log( this.arr[ 1 ] + ' ' + this.arr[ 5 ] + ' ' + this.arr[ 9 ] + ' ' + this.arr[ 13 ] );
        console.log( this.arr[ 2 ] + ' ' + this.arr[ 6 ] + ' ' + this.arr[ 10 ] + ' ' + this.arr[ 14 ] );
        console.log( this.arr[ 3 ] + ' ' + this.arr[ 7 ] + ' ' + this.arr[ 11 ] + ' ' + this.arr[ 15 ] );
    }
}