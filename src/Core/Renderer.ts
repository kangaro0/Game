import { Scene } from "./Scene";

export class Renderer {

    private gl: WebGL2RenderingContext;
    private scene: Scene;

    constructor( gl: WebGL2RenderingContext, scene: Scene ){
        this.gl = gl;
        this.scene = scene;
    }

    public init(){
        let gl = this.gl;
        gl.clearColor( 0.0,0.0,0.0,1.0 );
    }

    public render(){
        let gl = this.gl;
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
        gl.viewport( 0.0, 0.0, gl.canvas.clientWidth, gl.canvas.clientHeight );

        this.scene.draw();
    }
}