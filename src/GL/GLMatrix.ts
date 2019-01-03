import { Matrix4 } from '../Math/Matrix4';

export class GLMatrix {

    // https://github.com/mrdoob/three.js/blob/dev/src/cameras/PerspectiveCamera.js
    public static Perspective( fov: number, aspect: number, n: number, f: number ){
        var near = n;
        var far = f;
        var top = near * Math.tan( Math.PI / 180 * 0.5 * fov );
        var height = 2 * top;
        var width = aspect * height;
        var left = -0.5 * width;
        var right = left + width;
        var bottom = top - height;
        
        var x = 2 * near / ( right - left );
        var y = 2 * near / ( top - bottom );

        var a = ( right + left ) / ( right - left );
        var b = ( top + bottom ) / ( top - bottom );
        var c = -( far + near ) / ( far - near );
        var d = -2 * far * near / ( far - near );

        let arr = [
            x,0,0,0,
            0,y,0,0,
            a,b,c,-1,
            0,0,d,0
        ];

        let m = new Matrix4( arr );
        return m;
    }

    public static Camera( ){

    }
}