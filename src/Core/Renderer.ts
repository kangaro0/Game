import { Scene } from "./Scene";

export class Renderer {

    private scene: Scene;

    constructor( scene: Scene ){
        this.scene = scene;
    }

    public render(){
        this.scene.draw();
    }
}