import { Geometry } from './Geometry';
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

    // Transformation
    private matrix: Matrix4;

    // Shaders
    private vertexShader: WebGLShader | null;
    private fragmentShader: WebGLShader | null;
    private program: WebGLProgram | null;

    private attributeLocations: Array<number>;
    private uniformLocations: Array<WebGLUniformLocation>;

    constructor( g: Geometry ){
        this.id = UUID.create();
        this.geometry = g;
        this.matrix = Matrix4.identity();

        this.children = new List<Object3D>();
        this.parent = null;

        this.vertexShader = null;
        this.fragmentShader = null;
        this.program = null;


        this.attributeLocations = new Array<number>();
        this.uniformLocations = new Array<WebGLUniformLocation>();
    }

    // Getter & Setter
    public getId(){
        return this.id;
    }

    public getGeometry(){
        return this.geometry;
    }

    public setGeometry( geo: Geometry ){
        this.geometry = geo;
    }

    public getMatrix(){
        return this.matrix;
    }

    public setMatrix( m: Matrix4 ){
        this.matrix = m;
    }

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

    public getShaders(){
        return {
            vertexShader: this.vertexShader,
            fragmentShader: this.fragmentShader
        };
    }

    public setShaders( vertexShader: WebGLShader, fragmentShader: WebGLShader ){
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
    }

    public getProgram(){
        return this.program;
    }

    public setProgram( program: WebGLProgram ){
        this.program = program;
    }

    public getAttributeLocations(){
        return this.attributeLocations;
    }

    public getUniformLocations(){
        return this.uniformLocations;
    }

    // Rendering
    public setup( gl: WebGL2RenderingContext ){

        // Get Vertex Attribute
        this.attributeLocations.push( gl.getAttribLocation( this.program as WebGLProgram, 'vertex' ) );
        // Get Uniforms
        this.uniformLocations.push( gl.getUniformLocation( this.program as WebGLProgram, 'u_perspective' ) as WebGLUniformLocation );
        this.uniformLocations.push( gl.getUniformLocation( this.program as WebGLProgram, 'u_modelview' ) as WebGLUniformLocation );
        this.uniformLocations.push( gl.getUniformLocation( this.program as WebGLProgram, 'u_color' ) as WebGLUniformLocation );

        // Create Buffers
        this.geometry.createBuffers( gl );

        this.children.forEach( ( v, i ) => {
            v.setup( gl );
        });
    }
}