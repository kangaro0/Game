import { Matrix4 } from '../Math/Matrix4';
import { Vector4 } from '../Math/Vector4';

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
            x,0,a,0,
            0,y,b,0,
            0,0,c,d,
            0,0,-1,0
        ];

        let m = new Matrix4( arr );
        return m;
    }

    public static Perspective2(){}

    public static View( eye: Vector4, up: Vector4, target: Vector4 ){
        let z = eye.substract( target ).normalize();
        let x = up.crossProduct( z ).normalize();
        let y = z.crossProduct( x );

        x.setW( -x.dotProduct( eye ) );
        y.setW( -y.dotProduct( eye ) );
        z.setW( -z.dotProduct( eye ) );

        let arr = [
            x.getX(),y.getX(),z.getX(),0,
            x.getY(),y.getY(),z.getY(),0,
            x.getZ(),y.getZ(),z.getZ(),0,
            x.getW(),y.getW(),z.getW(),1
        ];
        
        return new Matrix4( arr );
    }

    public static View2( eye: Vector4, up: Vector4, target: Vector4 ){
        let vp = eye;
        let vpn = eye.substract( target ).normalize();
        let vup = up;

        let x = vup.crossProduct( vpn ).normalize();
        let y = vpn.crossProduct( x ).normalize();
        let z = x.crossProduct( y );

        let arr = [
            x.getX(),y.getX(),z.getX(),0,
            x.getY(),y.getY(),z.getY(),0,
            x.getZ(),y.getZ(),z.getZ(),0,
            x.getW(),y.getW(),z.getW(),1
        ];
        return new Matrix4( arr );
    }

    /*
        mat4 LookAtRH( vec3 eye, vec3 target, vec3 up )
        {
            vec3 zaxis = normal(eye - target);    // The "forward" vector.
            vec3 xaxis = normal(cross(up, zaxis));// The "right" vector.
            vec3 yaxis = cross(zaxis, xaxis);     // The "up" vector.
        
            // Create a 4x4 view matrix from the right, up, forward and eye position vectors
            mat4 viewMatrix = {
                vec4(      xaxis.x,            yaxis.x,            zaxis.x,       0 ),
                vec4(      xaxis.y,            yaxis.y,            zaxis.y,       0 ),
                vec4(      xaxis.z,            yaxis.z,            zaxis.z,       0 ),
                vec4(-dot( xaxis, eye ), -dot( yaxis, eye ), -dot( zaxis, eye ),  1 )
            };
            
            return viewMatrix;
        }
    */
}