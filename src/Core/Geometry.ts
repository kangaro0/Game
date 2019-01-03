import { BufferObject, GeometryDescription } from "../Interfaces";
import { runInThisContext } from "vm";

export class Geometry {

    // Vector Data
    private vertices: Float32Array;
    private colors: Uint8Array;
    private normales: Float32Array;
    private indices: Uint16Array;

    // GL Data
    private buffersCreated: boolean;
    private buffers: BufferObject;

    // Info
    private elementCount: number;

    constructor(){
        this.vertices = new Float32Array( 0 );
        this.colors = new Uint8Array( 0 );
        this.normales = new Float32Array( 0 );
        this.indices = new Uint16Array( 0 );

        this.buffers = {
            vertexBuffer: null,
            colorBuffer: null,
            indexBuffer: null
        };
        this.buffersCreated = false;

        this.elementCount = 0;
    }

    // Getter & Setter
    public getVertices(){
        return this.vertices;
    }

    public getNormales(){
        return this.normales;
    }

    public getIndices(){
        return this.indices;
    }

    public getBuffers(){
        return this.buffers;
    }

    public setVertices( arr: Float32Array ){
        this.vertices = arr;
    }

    public setNormales( arr: Float32Array ){
        this.normales = arr;
    }

    public setIndices( arr: Uint16Array ){
        this.indices = arr;
    }

    public setBuffers( buffers: BufferObject ){
        this.buffers = buffers;
    }

    public getElementCount(){
        return this.elementCount;
    }

    // GL
    public createBuffers( gl: WebGL2RenderingContext ){
        if( this.buffersCreated )
            return;

        if( this.vertices.length !== 0 ){
            this.buffers.vertexBuffer = gl.createBuffer();
            gl.bindBuffer( gl.ARRAY_BUFFER, this.buffers.vertexBuffer );
            gl.bufferData( gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW );

            this.elementCount = this.vertices.length;
        }

        if( this.indices.length !== 0 ){
            this.buffers.indexBuffer = gl.createBuffer();
            gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.buffers.indexBuffer );
            gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW );

            this.elementCount = this.indices.length;
        }

        this.buffersCreated = true;
    }

    // Static
    public static fromDesc( geo: GeometryDescription ){
        let g = new Geometry();
        g.setVertices( geo.vertices );
        g.setNormales( geo.normales );
        if( geo.indices )
            g.setIndices( geo.indices );
        return g;
    }
}