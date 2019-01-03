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

    // Conversion
    public toArray(){
        return [ this.arr[ 0 ], this.arr[ 1 ], this.arr[ 2 ], this.arr[ 3 ] ];
    }

    // Math
    public add( v: Vector4 ){
        this.arr[ 0 ] += v.getX();
        this.arr[ 1 ] += v.getY();
        this.arr[ 2 ] += v.getZ();
    }

    public multiplyScalar( s: number ){
        this.arr[ 0 ] *= s;
        this.arr[ 1 ] *= s;
        this.arr[ 2 ] *= s;
    }

    public normalize(){
        let l = 0;
        for( let i = 0; i < 3 ; i++ )
            l = l + Math.pow( this.get( i ), 2 );
        l = Math.sqrt( l );
        this.multiplyScalar( 1 / l ); 
    }
}