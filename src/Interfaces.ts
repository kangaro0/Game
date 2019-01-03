export interface ListItem {
    getId: () => string;
}

export interface GeometryDescription {
    vertices: Float32Array;
    normales: Float32Array;
    indices?: Uint16Array;
}

export interface BufferObject {
    vertexBuffer: WebGLBuffer | null;
    colorBuffer: WebGLBuffer | null;
    indexBuffer: WebGLBuffer | null;
}