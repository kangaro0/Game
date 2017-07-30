
import { IPoint } from '../Interfaces/IPoint';

export class MapRendererOptions {
    container: string;
}

export class MapRenderer  {

    private canvas: HTMLCanvasElement;
    private options: MapRendererOptions;

    constructor( options: MapRendererOptions ){
        this.options = options;
    }

    public render( points: Array<IPoint> ){
        this.removeCanvas();

        var size = Math.sqrt( points.length );

        this.createCanvas( size );
        var ctx = this.canvas.getContext( '2d' );

        var z = 0, maxZ = size;
        for( ; z < maxZ ; z++ ){

            var x = 0, maxX = size;
            for( ; x < maxX ; x++ ){

                ctx.fillStyle = 'rgba( 0, 0, 0, ' + points[ ( size * x ) + z ].y + ')';
                ctx.fillRect( x, z, 1, 1 );
            }
        }
    }

    private createCanvas( size: number ){
        this.canvas = document.createElement( 'canvas' );
        this.canvas.height = size;
        this.canvas.width = size;
    }

    private removeCanvas( ){
        var parent = document.getElementById( this.options.container );
        
        if( parent && this.canvas )
            parent.removeChild( this.canvas );
    }
}