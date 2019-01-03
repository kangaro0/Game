export class GLHelper {

    public static createShader( gl: WebGL2RenderingContext, type: number, source: string ) {
        let shader = gl.createShader( type ) as WebGLShader;
        gl.shaderSource( shader, source );
        gl.compileShader( shader );
        var success = gl.getShaderParameter( shader, gl.COMPILE_STATUS );
        if( success )
            return shader;

        console.log( gl.getShaderInfoLog( shader ) );
        gl.deleteShader( shader );
    }

    public static createProgram( gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader ){
        let program = gl.createProgram() as WebGLProgram;
        gl.attachShader( program, vertexShader );
        gl.attachShader( program, fragmentShader );
        gl.linkProgram( program );
        var success = gl.getProgramParameter( program, gl.LINK_STATUS );
        if( success )
            return program;

        console.log( gl.getProgramInfoLog( program ) );
        gl.deleteProgram( program );
    }
}