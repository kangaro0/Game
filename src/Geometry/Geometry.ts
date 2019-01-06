import { BufferObject, GeometryDescription } from "../Interfaces";
import { runInThisContext } from "vm";

export class Geometry {

    // Vector Data
    private vertices: Float32Array;
    private texCoords: Float32Array;
    private colors: Uint8Array;
    private normales: Float32Array;
    private indices: Uint16Array;

    // GL
    private buffers: Array<WebGLBuffer>;
    private vao: WebGLVertexArrayObject | null;

    constructor(){
        this.vertices = new Float32Array( 0 );
        this.texCoords = new Float32Array( 0 );
        this.colors = new Uint8Array( 0 );
        this.normales = new Float32Array( 0 );
        this.indices = new Uint16Array( 0 );

        this.buffers = new Array<WebGLBuffer>();
        this.vao = null;
    }

    // Getter
    public getVertices(){
        return this.vertices;
    }

    public getTexCoords(){
        return this.texCoords;
    }

    public getNormales(){
        return this.normales;
    }

    public getIndices(){
        return this.indices;
    }

    public getVAO(){
        return this.vao;
    }

    // Setter
    public setVertices( arr: Float32Array ){
        this.vertices = arr;
    }

    public setTexCoords( arr: Float32Array ){
        this.texCoords = arr;
    }

    public setNormales( arr: Float32Array ){
        this.normales = arr;
    }

    public setIndices( arr: Uint16Array ){
        this.indices = arr;
    }
}