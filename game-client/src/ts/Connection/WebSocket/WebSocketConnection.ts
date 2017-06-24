
import { IObservable, IObserver } from '../../interfaces/common';

export class WebSocketConnection implements IObservable {

    private webSocket: WebSocket;

    private observers: Array<IObserver>;

    constructor( ){
        this.observers = new Array<IObserver>();
    }

    public connect( url: string ): Promise<void> {

        return new Promise<void>( ( resolve, reject ) => {
            if( url == null )
                reject( new Error( 'WebSocketConnection: No url specified.' ) ); 

            this.webSocket = new WebSocket( url );
            this.webSocket.binaryType = 'arraybuffer';

            this.webSocket.onopen = ( event ) => {
                resolve();
            };
            this.webSocket.onmessage = ( event ) => {
                this.notify( new Uint8Array( event.data ) );
            };
            this.webSocket.onerror = ( event ) => {
                reject( new Error( 'WebSocketConnection: WebSocket -> onError' ) );
            };
            this.webSocket.onclose = ( event ) => {
                reject( new Error( 'WebSocketConnection: WebSocket -> onClose' ) );
            }

        });
    }

    public send( data: Uint8Array ){
        if( this.isConnected() )
            this.webSocket.send( data );
    }

    public disconnect() {
        this.webSocket.close();
    }

    public isConnected() {
        return this.webSocket.readyState == WebSocket.OPEN;
    }

    /* IObservable */

    public register( observer: IObserver ){
        this.observers.push( observer );
    }

    public unregister( observer: IObserver ){
        var index = this.observers.indexOf( observer );
        if( index != -1 )
            this.observers.splice( index, 1 );
    }

    public notify( data: Uint8Array ){
        var current = 0, max = this.observers.length;
        for( ; current < max ; current++ ){
            this.observers[ current ].receive( data );
        }
    }
}