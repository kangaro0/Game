
import { ITerrainOptions } from './ITerrainOptions';

export interface ISceneCreatorOptions {
    scene: ISceneOptions;
    terrain: ITerrainOptions;
}

export interface ISceneOptions {
    radius: number;     // count of chunks rendered around the player
}