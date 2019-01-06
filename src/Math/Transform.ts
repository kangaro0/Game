import { Vector4 } from "./Vector4";
import { Matrix4 } from "./Matrix4";

export class Transform {

    public static Translate( v: Vector4 ){
        let arr = [
            1,0,0,v.getX(),
            0,1,0,v.getY(),
            0,0,1,v.getZ(),
            0,0,0,1
        ];

        let m = new Matrix4( arr );
        return m;
    }

    public static Rotate( a: Vector4, d: number ){
        
    }

    public static Scale( v: Vector4 ){
        let arr = [
            v.getX(),0,0,0,
            0,v.getY(),0,0,
            0,0,v.getZ(),0,
            0,0,0,1
        ];

        let m = new Matrix4( arr );
        return m;
    }

    public static build( t: Matrix4, r: Matrix4, s: Matrix4 ): Matrix4 {
        return t.multiply( r.multiply( s ) );
    }
}