import { Object3D } from "./Object3D";
import { List } from "../Data/List";
import { Matrix4 } from "../Math/Matrix4";

export class Scene {

    private gl: WebGL2RenderingContext;
    private objects: List<Object3D>;
    private matrix: Matrix4;
    

    constructor( gl: WebGL2RenderingContext ){
        this.gl = gl;
        this.objects = new List<Object3D>();
        this.matrix = Matrix4.identity();
    }

    public getMatrix(){
        return this.matrix;
    }

    public setMatrix( m: Matrix4 ){
        this.matrix = m;
    }

    public getObjects(){
        return this.objects;
    }

    public getObject( identifier: string ){
        return this.objects.getByIdentifier( identifier );
    }

    public addObject( obj: Object3D ){
        this.objects.push( obj );
    }

    public draw(){
        // Draw every object that is available
        this.objects.forEach( ( item, index ) => {

            let gl = this.gl;

            item.setup( gl );

            // Get geometry
            let geometry = item.getGeometry();
            geometry.createBuffers( gl );
            // Get information from geometry
            let buffers = geometry.getBuffers();
            let elementCount = geometry.getElementCount();
            
            // Get attribute locations
            let attributeLocations = item.getAttributeLocations();
            // Get uniform locations
            let uniformLocations = item.getUniformLocations();

            // Send vertices to shader
            gl.bindBuffer( gl.ARRAY_BUFFER, buffers.vertexBuffer );
            gl.vertexAttribPointer(
                attributeLocations[ 0 ],
                4,
                gl.FLOAT,
                false,
                0,
                0
            );
            gl.enableVertexAttribArray( attributeLocations[ 0 ] )

            // Send colors to shader
            // tbd

            // Send indices to shader
            gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, buffers.indexBuffer );

            // Set program 
            gl.useProgram( item.getProgram() );

            // Set uniforms
            // perspective matrix: [ 0 ]
            gl.uniformMatrix4fv(
                uniformLocations[ 0 ],
                false,
                this.getMatrix().getBuffer()
            );
            // modelview matrix: [ 1 ]
            gl.uniformMatrix4fv(
                uniformLocations[ 1 ],
                false,
                item.getMatrix().getBuffer()
            );
            // color vector - removed when color per vertex implemented
            gl.uniform4fv(
                uniformLocations[ 2 ],
                new Float32Array([ 1.0,0.0,0.0,1.0 ])
            );

            // Draw this shit
            gl.drawElements(
                gl.TRIANGLES,
                elementCount,
                gl.UNSIGNED_SHORT,
                0
            );

            // Clean up
            gl.useProgram( null );
            gl.bindBuffer( gl.ARRAY_BUFFER, null );
            gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, null );
        });
    }
}