

export interface ITerrainOptions {
    mapSize: number;
    chunkSize: number;
    surface: INoiseOptions;
    biomes: INoiseOptions;
    waterLevel: number;             // Bis zu welcher Hoehe ist Wasser vorhanden? 
}

export interface INoiseOptions {
    octaves: Array<IOctaveOptions>; // Oktaven -> Individuellere HeightMap
    seed: number;                   // Anpassbare Random Funktion
    maxHeight: number;              // maximale Hoehe der HeightMap
    redistribution: number;         // 
    step: number;                   // Anpassung der Hoehe an VoxelSize, z.B. VoxelSize = 10 * 10 * 10 -> step: 10; 
}

export interface IOctaveOptions {
    frequency: number;              // Frequenz, Zoom 
}