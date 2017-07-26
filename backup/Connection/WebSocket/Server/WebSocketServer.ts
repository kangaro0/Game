
import { IncomingWebSocketMessage, IncomingWebSocketMessageType } from '../Message/IncomingWebSocketMessage';
import { IObservable, IObserver } from '../../../Interfaces/Common';

export class WebSocketServer implements IObservable {

    private server: any;
    private io: any;

    private incomingMessageQueue: MessageQueue< IncomingWebSocketMessage >;
    private outgoingMessageQueue: MessageQueue< IncomingWebSocketMessage >;

    private observers: Array< IObserver >;

    constructor() {
        this.incomingMessageQueue = new MessageQueue< IncomingWebSocketMessage >();
    }

    public start( ){
        this.server = require('http').createServer();
        this.io = require('io')(this.server);

        this.io.on( 'connection', ( client: any ) => {
            
        });
    }

    private pushIncoming( message: IncomingWebSocketMessage  ){
        this.incomingMessageQueue
    }

    public popIncoming( ): { valid: boolean, message?: IncomingWebSocketMessage } {
        if( this.incomingMessageQueue.hasNext() )
            return { valid: true, message: this.incomingMessageQueue.pop() };
        return { valid: false };
    }

    public pushOutgoing( message: IncomingWebSocketMessage ){
        this.outgoingMessageQueue.push( message );
    }

    private popOutgoing( ){
        if( !this.outgoingMessageQueue.hasNext() )
            return null;
        return this.outgoingMessageQueue.pop();
    }

    public register( observer: IObserver ){
        this.observers.push( observer );
    }

    public unregister( observer: IObserver ){
        var indexOf = this.observers.indexOf( observer );
        if( indexOf != - 1 ) this.observers.splice( indexOf, 1 );
    }

    public notify( ){
        var current = 0, max = this.observers.length;
        for( ; current < max ; current++ )
            this.observers[ current ].receive( );
    }


}