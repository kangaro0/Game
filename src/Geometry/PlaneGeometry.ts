import { Geometry } from "./Geometry";

export class PlaneGeometry extends Geometry {

    constructor(){
        super();

        this.setVertices(
            new Float32Array([
                -0.5,-0.5,0.5,1.0,
                0.5,-0.5,0.5,1.0,
                0.5,0.5,0.5,1.0,
                -0.5,0.5,0.5,1.0,
            ])
        );

        this.setNormales(
            new Float32Array([
                0.0,0.0,-1.0,1.0,
                0.0,0.0,-1.0,1.0,
                0.0,0.0,-1.0,1.0,
                0.0,0.0,-1.0,1.0
            ])
        );

        this.setIndices(
            new Uint16Array([
                0,1,2,      
                0,2,3
            ])
        );
    }
}