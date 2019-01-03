import { GeometryDescription } from "../../Interfaces";

export class GeometryFactory {

    public static Plane(): GeometryDescription {
        return {
            vertices: new Float32Array([
                -0.5,-0.5,0.5,1.0,
                0.5,-0.5,0.5,1.0,
                0.5,0.5,0.5,1.0,
                -0.5,0.5,0.5,1.0,
            ]),
            normales: new Float32Array([
                0.0,0.0,-1.0,1.0,
                0.0,0.0,-1.0,1.0,
                0.0,0.0,-1.0,1.0,
                0.0,0.0,-1.0,1.0
            ]),
            indices: new Uint16Array([
                0,1,2,      
                0,2,3
            ])
        };
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Creating_3D_objects_using_WebGL
    public static Cube(): GeometryDescription {
        return {
            vertices: new Float32Array([
                // Front
                -0.5,-0.5,0.5,1.0,
                0.5,-0.5,0.5,1.0,
                0.5,0.5,0.5,1.0,
                -0.5,0.5,0.5,1.0,
                // Back
                -0.5,-0.5,-0.5,1.0,
                -0.5,0.5,-0.5,1.0,
                0.5,0.5,-0.5,1.0,
                0.5,-0.5,-0.5,1.0,
                // Top
                -0.5,0.5,-0.5,1.0,
                -0.5,0.5,0.5,1.0,
                0.5,0.5,0.5,1.0,
                0.5,0.5,-0.5,1.0,
                // Bottom
                -0.5,-0.5,-0.5,1.0,
                0.5,-0.5,-0.5,1.0,
                0.5,-0.5,0.5,1.0,
                -0.5,-0.5,0.5,1.0,
                // Right
                0.5,-0.5,-0.5,1.0,
                0.5,0.5,-0.5,1.0,
                0.5,0.5,0.5,1.0,
                0.5,-0.5,0.5,1.0,
                // Left
                -0.5,-0.5,-0.5,1.0,
                -0.5,-0.5,0.5,1.0,
                -0.5,0.5,0.5,1.0,
                -0.5,0.5,-0.5,1.0
            ]),
            normales: new Float32Array([
                // Front
                0.0,0.0,-1.0,1.0,
                0.0,0.0,-1.0,1.0,
                0.0,0.0,-1.0,1.0,
                0.0,0.0,-1.0,1.0,
                // Back
                0.0,0.0,1.0,1.0,
                0.0,0.0,1.0,1.0,
                0.0,0.0,1.0,1.0,
                0.0,0.0,1.0,1.0,
                // Top
                0.0,1.0,0.0,1.0,
                0.0,1.0,0.0,1.0,
                0.0,1.0,0.0,1.0,
                0.0,1.0,0.0,1.0,
                // Bottom
                0.0,-1.0,0.0,1.0,
                0.0,-1.0,0.0,1.0,
                0.0,-1.0,0.0,1.0,
                0.0,-1.0,0.0,1.0,
                // Right
                1.0,0.0,0.0,1.0,
                1.0,0.0,0.0,1.0,
                1.0,0.0,0.0,1.0,
                1.0,0.0,0.0,1.0,
                // Left
                -1.0,0.0,0.0,1.0,
                -1.0,0.0,0.0,1.0,
                -1.0,0.0,0.0,1.0,
                -1.0,0.0,0.0,1.0
            ]),
            indices: new Uint16Array([
                // Front
                0,1,2,      
                0,2,3,
                // Back
                4,5,6,      
                4,6,7,
                // Top
                8,9,10,    
                8,10,11,
                // Bottom
                12,13,14,   
                12,14,15,
                // Right
                16,17,18,   
                16,18,19,
                // Left
                20,21,22,   
                20,22,23
            ])
        }
    }
}