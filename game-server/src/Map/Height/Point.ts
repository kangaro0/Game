
export interface PointOptions {
    x: number;
    y?: number;
    z: number;
}

export class Point {

    private x: number; private y: number;  private z: number;

    constructor( options: PointOptions ){
        if( options == null )
            throw new Error( 'Point -> cstr(): No options provided.' );
        this.x = options.x || -1;
        this.y = options.y || -1;
        this.z = options.z || -1;
    };

    public getX(): number {
        return this.x;
    };

    public getY(): number {
        return this.y;
    };

    public getZ(): number {
        return this.z;
    }

    public setY( y: number ): void {
        this.y = y;
    }
}