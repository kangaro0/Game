export class Vector4 {

    public NUM_OF_ELEMENTS = 4;

    private arr: Float32Array;

    constructor( x: number, y: number, z: number, w: number ){
        this.arr = new Float32Array( 4 );
        this.arr[ 0 ] = x;
        this.arr[ 1 ] = y;
        this.arr[ 2 ] = z;
        this.arr[ 3 ] = w;
    }

    // Getter
    public getX(){
        return this.arr[ 0 ];
    }
    
    public getY(){
        return this.arr[ 1 ];
    }

    public getZ(){
        return this.arr[ 2 ];
    }

    public getW(){
        return this.arr[ 3 ];
    }

    public get( i: number ){
        return this.arr[ i ];
    }

    public getBuffer(){
        return this.arr;
    }

    // Setter
    public setX( v: number ){
        this.arr[ 0 ] = v;
    }

    public setY( v: number ){
        this.arr[ 1 ] = v;
    }

    public setZ( v: number ){
        this.arr[ 2 ] = v;
    }

    public setW( v: number ){
        this.arr[ 3 ] = v;
    }

    public set( i: number, v: number ){
        this.arr[ i ] = v;
    }

    // Conversion
    public toArray(){
        return [ this.arr[ 0 ], this.arr[ 1 ], this.arr[ 2 ], this.arr[ 3 ] ];
    }

    // Math
    public add( v: Vector4 ): Vector4 {
        let u = new Vector4( 0,0,0,1 );

        u.set( 0, this.arr[ 0 ] + v.getX() );
        u.set( 1, this.arr[ 1 ] + v.getY() );
        u.set( 2, this.arr[ 2 ] + v.getZ() );

        return u;
    }

    public substract( v: Vector4 ): Vector4 {
        let u = new Vector4( 0,0,0,1 );

        u.set( 1, this.arr[ 0 ] - v.getX() );
        u.set( 2, this.arr[ 1 ] - v.getX() );
        u.set( 3, this.arr[ 2 ] - v.getZ() );

        return u;
    }

    public multiplyScalar( s: number ): Vector4 {
        let u = new Vector4( 0,0,0,this.getW() );

        u.set( 0, this.arr[ 0 ] * s );
        u.set( 1, this.arr[ 1 ] * s );
        u.set( 2, this.arr[ 2 ] * s );

        return u;
    }

    public dotProduct( v: Vector4 ): number {
        let sum = 0;
        for( let i = 0 ; i < 4 ; i++ )
            sum += this.get( i ) * v.get( i );
        return sum;
    }

    public crossProduct( v: Vector4 ): Vector4 {
        let u = new Vector4( 0,0,0,1 );

        u.set( 0, this.arr[ 1 ] * v.getZ() - this.arr[ 2 ] * v.getY() );
        u.set( 1, this.arr[ 2 ] * v.getX() - this.arr[ 0 ] * v.getZ() );
        u.set( 2, this.arr[ 3 ] * v.getY() - this.arr[ 1 ] * v.getX() );

        return u;
    }

    public normalize(): Vector4 {
        let mean = 0;

        for( let i = 0 ; i < 3 ; i++ )
            mean += Math.pow( this.get( i ), 2 );
        mean = Math.sqrt( mean );
        
        return this.multiplyScalar( 1 / mean );
    }

    public print(){
        console.log( this.getX() + ' ' + this.getY() + ' ' + this.getZ() + ' ' + this.getW() );
    }
}