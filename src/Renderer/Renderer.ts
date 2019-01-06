import { Scene } from "../Core/Scene";
import { Matrix4 } from "../Math/Matrix4";

export class Renderer {

    private gl: WebGL2RenderingContext;
    private scene: Scene;

    private matrix: Matrix4;

    constructor( gl: WebGL2RenderingContext, scene: Scene ){
        this.gl = gl;
        this.scene = scene;
        this.matrix = Matrix4.identity();

        this.init();
    }

    // Getter
    public getMatrix(){
        return this.matrix;
    }

    // Setter
    public setMatrix( m: Matrix4 ){
        this.matrix = m;
    }

    private init(){
        let gl = this.gl;

        // Setup gl
        gl.clearColor( 0.0,0.0,0.0,1.0 );
        gl.viewport( 0.0, 0.0, gl.canvas.clientWidth, gl.canvas.clientHeight );
    }

    public render(){
        let gl = this.gl;
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

        // Get all objects that need to be renderer from scene
        let objects = this.scene.getObjects();
        objects.forEach( ( item, index ) => {
            gl.useProgram( item.getProgram() );
            gl.bindVertexArray( item.getVAO() );

            let uLocations = item.getUniformLocations();

            // perspective matrix
            gl.uniformMatrix4fv(
                uLocations[ 0 ],
                false,
                this.matrix.getBuffer()
            );
            // view matrix
            gl.uniformMatrix4fv(
                uLocations[ 1 ],
                false,
                this.scene.getMatrix().getBuffer()
            );
            // model matrix
            gl.uniformMatrix4fv(
                uLocations[ 2 ],
                false,
                item.getMatrix().getBuffer()
            )

            gl.drawElements( gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0 );
        });
    }
}