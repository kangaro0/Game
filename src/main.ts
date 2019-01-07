import { GLHelper } from './GL/GLHelper';
import { GLMatrix } from './GL/GLMatrix';
import { Renderer } from './Renderer/Renderer';
import { Object3D } from './Core/Object3D';
import { Geometry } from './Geometry/Geometry';
import { Scene } from './Core/Scene';
import { Transform } from './Math/Transform';
import { Vector4 } from './Math/Vector4';
import { CubeGeometry } from './Geometry/CubeGeometry';

let camPos = new Vector4( 0,10,0,1 );

window.onload = () => {

    // Shaders
    let vertexShaderSource = require( './Shader/vertex.glsl' ).default;
    let fragmentShaderSource = require( './Shader/fragment.glsl' ).default;

    var canvas = document.getElementById( 'canvas' ) as HTMLCanvasElement;
    var gl = canvas.getContext( 'webgl2' ) as WebGL2RenderingContext;

    // Compile shaders and link to program
    let vertexShader = GLHelper.createShader( gl, gl.VERTEX_SHADER, vertexShaderSource ) as WebGLShader;
    let fragmentShader = GLHelper.createShader( gl, gl.FRAGMENT_SHADER, fragmentShaderSource ) as WebGLShader;
    let program = GLHelper.createProgram( gl, vertexShader, fragmentShader ) as WebGLProgram;

    // Create Geometry
    let geometry = new CubeGeometry();
    // Create Object3D
    let obj = new Object3D( geometry, gl, program );

    // Create View Matrix
    let viewMatrix = GLMatrix.View(
        new Vector4( 4,3,3,1 ),
        new Vector4( 0,1,0,1 ),
        new Vector4( 0,0,0,1 )
    );

    // Create scene
    let scene = new Scene();
    scene.setMatrix( viewMatrix );
    scene.addObject( obj );

    // Create perspective matrix
    let perspectiveMatrix = GLMatrix.Perspective(
        45,
        gl.canvas.clientWidth / gl.canvas.clientHeight,
        0.1,
        500
    );

    // Create renderer
    let renderer = new Renderer( gl, scene );
    renderer.setMatrix( perspectiveMatrix );

    function renderLoop(){
        let viewMatrix = GLMatrix.View( new Vector4( x,y,z,1 ), new Vector4( 0,1,0,1 ), new Vector4( 0,0,0,1 ) );
        scene.setMatrix( viewMatrix );

        renderer.render();
        requestAnimationFrame( renderLoop );
    }
    requestAnimationFrame( renderLoop );

}

let x = 0;
let y = 10;
let z = 0;

window.onkeypress = ( ev ) => {
    switch( ev.key ){
        case "w":
            x += 0.1;
            break;
        case "s":
            x -= 0.1;
            break;
        case "a":
            z -= 0.1;
            break;
        case "d":
            z += 0.1;
            break;
        case "r":
            y += 0.1;
            break;
        case "t":
            y += 0.1;
            break;
    }
}





/*

var buffers = new Array<WebGLBuffer>( 3 );

let matrixId: WebGLUniformLocation;
let colorId: WebGLUniformLocation;
let positionId: number;

let program: WebGLProgram;

if( gl ){

    // get Canvas Info
    let canvas_width = gl.canvas.width;
    let canvas_height = gl.canvas.height;

    //let vertexShaderSource = "";
    //let fragmentShaderSource = "";

    let vertexShader = GLHelper.createShader( gl, gl.VERTEX_SHADER, vertexShaderSource ) as WebGLShader;
    let fragmentShader = GLHelper.createShader( gl, gl.FRAGMENT_SHADER, fragmentShaderSource ) as WebGLShader;

    program = GLHelper.createProgram( gl, vertexShader, fragmentShader ) as WebGLProgram;

    // Get Vertex Data Pointer
    positionId = gl.getAttribLocation( program, 'a_position' );

    // Get Matrix & Color Data Pointer
    matrixId = gl.getUniformLocation( program, 'u_matrix' ) as WebGLUniformLocation;
    colorId = gl.getUniformLocation( program, 'u_color' ) as WebGLUniformLocation;

    let cubeData = GeometryFactory.Cube();

    // Create Buffer & VAO for Vertex Data
    let positionBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, cubeData.vertices, gl.STATIC_DRAW );

    let indexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indexBuffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, cubeData.indices, gl.STATIC_DRAW );

    buffers = [
        positionBuffer as WebGLBuffer,
        indexBuffer as WebGLBuffer
    ];

    requestAnimationFrame( render );
}

function drawScene( gl: WebGL2RenderingContext ){
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    gl.clearDepth( 1.0 );
    gl.enable( gl.DEPTH_TEST );
    gl.depthFunc( gl.LEQUAL );

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    let components = 4;
    let type = gl.FLOAT;
    let normalize = false;
    let stride = 0;
    let offset = 0;
    gl.bindBuffer( gl.ARRAY_BUFFER, buffers[ 0 ] );
    gl.vertexAttribPointer( 
        positionId,
        components,
        type,
        normalize,
        stride,
        offset 
    );
    gl.enableVertexAttribArray( positionId );

    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, buffers[ 1 ] );

    gl.useProgram( program );

    gl.uniformMatrix4fv( 
        matrixId,
        false,
        GLMatrix.Perspective( 45 * Math.PI / 180, gl.canvas.width / gl.canvas.height, 1, 500 ).getBuffer() 
    ); 
    gl.uniform4fv(
        colorId,
        new Float32Array([ 1.0,0.0,0.0,1.0 ])
    );

    {
    let vertexCount = 36;
    let type = gl.UNSIGNED_SHORT;
    let offset = 0;
    gl.drawElements( gl.TRIANGLES, vertexCount, type, offset );
    }
}

let then = 0;

function render( ){
    drawScene( gl as WebGL2RenderingContext );
    requestAnimationFrame( render );
}

*/
