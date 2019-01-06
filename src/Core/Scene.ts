import { Object3D } from "./Object3D";
import { List } from "../Data/List";
import { Matrix4 } from "../Math/Matrix4";

export class Scene {

    private objects: List<Object3D>;
    private matrix: Matrix4;
    
    constructor( m: Matrix4 ){
        this.objects = new List<Object3D>();
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

    public getMatrix(){
        return this.matrix;
    }
}