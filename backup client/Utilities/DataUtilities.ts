

export class DataUtilities {

    private static endianess: boolean;

    public static StringToUint8Array( str: string, data: Uint8Array, offset: number ): void {

        var endianess = this.getEndianess();
        var dataView = new DataView( data.buffer, data.byteOffset, data.byteLength );

        var current = offset, max = str.length;
        for( ; current < max ; current++ ){
            dataView.setUint16( current, str.charCodeAt( current - offset ), endianess );
        }
    }

    public static Uint8ArrayToString( data: Uint8Array, offset: number ): string {

        var endianess = this.getEndianess();
        var dataView = new DataView( data.buffer, data.byteOffset, data.byteLength );

        var str = '';

        var current = 0, max = data.length;
        for( ; current < max ; current++ ) {
            str += String.fromCharCode( dataView.getUint16( current + offset, endianess ) );
        }

        return str;
    }

    private static getEndianess( ){
        if( this.endianess )
            return this.endianess;
        
        var arrayBuffer = new ArrayBuffer( 2 );
        var uint8Array = new Uint8Array( arrayBuffer );
        var uint16array = new Uint16Array( arrayBuffer );

        uint8Array[0] = 0xAA; // set first byte
        uint8Array[1] = 0xBB; // set second byte

        if( uint16array[0] === 0xBBAA ) {
            this.endianess = true;
            return true;
        } 
        if( uint16array[0] === 0xAABB ) {
            this.endianess = false;
            return false;
        }

        else throw new Error("Something crazy just happened");
    }
}