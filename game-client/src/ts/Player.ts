
import { IPoint } from './Interfaces/IPoint';

export class Player {

    public position: IPoint;

    constructor( playerPosition: IPoint ){
        this.position = playerPosition;
    }
}