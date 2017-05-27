
class MapGenerator {

    private map: Array<Array<number>>;

    private size: number;
    private width: number;
    private height: number;

    constructor( width: number , height: number ){
        var size;
        this.size = size = width * height;

        this.map = new Array<Array<number>>( width );
        for( var i = 0 ; i < size ; i++ )
            this.map[ i ] = new Array<number>( height );
    }

    private generateMap(){
        var width = this.width, height = this.height;
        var x = 0;
        for( ; x < width ; x++ ){
            var z = 0;
            for( ; z < height ; z++ )
                this.map[ x ][ z ] = 1;
        }
    }
}

export { MapGenerator };