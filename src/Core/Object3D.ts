import { Geometry } from '../Geometry/Geometry';
import { Matrix4 } from "../Math/Matrix4";
import { UUID } from '../Data/UUID';
import { List } from '../Data/List';

export class Object3D {

    // Identifier
    private id: string;

    // Relationship
    private children: List<Object3D>;
    private parent: Object3D | null;

    // Geometry
    private geometry: Geometry;

    // GL
    private program: WebGLProgram;

    private vao: WebGLVertexArrayObject | null;
    private vbo: Array<WebGLBuffer>;

    private attributeLocations: Array<number>;
    private uniformLocations: Array<WebGLUniformLocation>;

    // Transformation
    private matrix: Matrix4;

    constructor( g: Geometry, gl: WebGL2RenderingContext, p: WebGLProgram ){
        this.id = UUID.create();
        this.matrix = Matrix4.identity();
        this.geometry = g;

        this.program = p;
        this.vao = null;
        this.vbo = new Array<WebGLBuffer>( 0 );
        this.attributeLocations = new Array<number>( 0 );
        this.uniformLocations = new Array<WebGLUniformLocation>( 0 );

        this.children = new List<Object3D>();
        this.parent = null;

        this.setup( gl );
    }

    // Getter 
    public getId(){
        return this.id;
    }

    public getGeometry(){
        return this.geometry;
    }

    public getMatrix(){
        return this.matrix;
    }

    public getProgram(){
        return this.program;
    }

    public getVAO(){
        return this.vao;
    }

    public getUniformLocations(){
        return this.uniformLocations;
    }

    // Setter
    public setGeometry( geo: Geometry ){
        this.geometry = geo;
    }

    public setMatrix( m: Matrix4 ){
        this.matrix = m;
    }

    // Relationship
    public getParent(){
        return this.parent;
    }

    public setParent( parent: Object3D ){
        this.parent = parent;
    }

    public getChildren(){
        return this.children;
    }

    public addChild( child: Object3D ){
        this.children.push( child );
    }

    public removeChild( identifier: string ){
        this.children.removeByIdentifier( identifier );
    }

    // GL
    private setup( gl: WebGL2RenderingContext ){
        // Create VAO
        this.vao = gl.createVertexArray();
        gl.bindVertexArray( this.vao );

        // Get Attribute Locations
        this.attributeLocations.push( gl.getAttribLocation( this.program, 'vertex' ) );
        this.attributeLocations.push( gl.getAttribLocation( this.program, 'u_color' ) );

        // Get Uniform Locations
        this.uniformLocations.push( gl.getUniformLocation( this.program, 'u_perspective' ) as WebGLUniformLocation );
        this.uniformLocations.push( gl.getUniformLocation( this.program, 'u_view' ) as WebGLUniformLocation );
        this.uniformLocations.push( gl.getUniformLocation( this.program, 'u_model' ) as WebGLUniformLocation );

        // Push vertices 
        this.vbo.push( gl.createBuffer() as WebGLBuffer );
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.vbo[ 0 ] );
        gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.geometry.getVertices(), gl.STATIC_DRAW );
        gl.vertexAttribPointer( 
            this.attributeLocations[ 0 ],
            4,
            gl.FLOAT,
            false,
            0,
            0
        );
        gl.enableVertexAttribArray( this.attributeLocations[ 0 ] );

        // Push indices to buffer
        this.vbo.push( gl.createBuffer() as WebGLBuffer )
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.vbo[ 1 ] );
        gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.geometry.getIndices(), gl.STATIC_DRAW );
    
        // Clear
        gl.bindVertexArray( null );
    }
}