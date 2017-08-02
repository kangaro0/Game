
export interface IMapGeneratorOptions {

    mapSize: number;                // quadratisches Grid; Groesse mapSize (x) * mapSize (y)
    chunkSize: number;              // quadratisches Grid; Groesse chunkSize (x) * mapSize(x)
    terrain: ITerrainOptions;

}

export interface ITerrainOptions {
    heights: INoiseOptions;
    biomes: INoiseOptions; 
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