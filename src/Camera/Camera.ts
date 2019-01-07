import { Matrix4 } from "../Math/Matrix4";

export class Camera {

    private matrix: Matrix4;

    constructor(){
        this.matrix = Matrix4.identity();
    }

    // Getter
    public getMatrix(){
        return this.matrix;
    }
}