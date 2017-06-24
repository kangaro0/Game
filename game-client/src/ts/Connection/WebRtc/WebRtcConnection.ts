
import { WebSocketConnection } from '../WebSocket/WebSocketConnection';
import { WebRtcMessageFactory } from './WebRtcMessageFactory';

import { IObserver } from '../../Interfaces/Common';

import { WebRtcSignalingMessageType } from './WebRtcMessage';

export interface ConnectionOptions {
    url: string;

}

class WebRtcConnection implements IObserver {

    // signaling
    private webSocketConnection: WebSocketConnection;

    // webrtcpeerconnection <3
    private rtcPeerConnection: RTCPeerConnection;
    private reliableDataChannel: RTCDataChannel;
    private unreliableDataChannel: RTCDataChannel;

    constructor( ){
        this.webSocketConnection = new WebSocketConnection();
    }

    public connect( conOptions: ConnectionOptions ): Promise<void> {
        
        return new Promise<void>( ( resolve, reject ) => {
            // connect to websocket
            this.webSocketConnection.connect( conOptions.url )
            // do signaling
            .then( () => {
                return this.rtcPeerConnection.createOffer( )
            })
            .then( ( offer ) => {
                return this.rtcPeerConnection.setLocalDescription( offer )
            })
            .then( () => {
                var message = WebRtcMessageFactory.produceBinary( WebRtcSignalingMessageType.OFFER, JSON.stringify( this.rtcPeerConnection.localDescription ) );

                this.webSocketConnection.send( message );
            })
            .catch( ( error ) => {
                reject( error );
            });
        });
    }

    private initRtcPeerConnection(){

        this.rtcPeerConnection = new RTCPeerConnection( );
        this.rtcPeerConnection.onicecandidate = ( event ) => {

            var message = WebRtcMessageFactory.produceBinary( WebRtcSignalingMessageType.CANDIDATE, JSON.stringify( event.candidate ) );
            this.webSocketConnection.send( message );
        };

        this.reliableDataChannel = this.rtcPeerConnection.createDataChannel( 'reliable', { } );
        this.reliableDataChannel.onopen = ( event ) => {

        };
        this.reliableDataChannel.onmessage = ( event ) => {
            
        };
        this.reliableDataChannel.onerror = ( event ) => {

        };
        this.reliableDataChannel.onclose = ( event ) => {

        };

        this.unreliableDataChannel = this.rtcPeerConnection.createDataChannel( 'unreliable', { maxRetransmits: 0, ordered: false } );
        this.unreliableDataChannel.onopen = ( event ) => {
            
        };
        this.unreliableDataChannel.onmessage = ( event ) => {

        };
        this.unreliableDataChannel.onerror = ( event ) => {

        };
        this.unreliableDataChannel.onclose = ( event ) => {

        };
    }

    /* Observer */
    public receive( data: Uint8Array ){
        switch( this.rtcPeerConnection.connectionState ){

            case 'connecting':
                // we are in signaling
                var message = WebRtcMessageFactory.produceMessage( data );

                switch( message.type ){

                    case WebRtcSignalingMessageType.CANDIDATE:

                        this.rtcPeerConnection.addIceCandidate( message.candidate );
                        break;
                    
                    case WebRtcSignalingMessageType.OFFER:

                        this.rtcPeerConnection.setRemoteDescription( message.sessionDescription )
                        .then( ( ) => {
                            return this.rtcPeerConnection.createAnswer(  );
                        })
                        .then( ( answer ) => {
                            this.webSocketConnection.send( WebRtcMessageFactory.produceBinary( WebRtcSignalingMessageType.ANSWER, JSON.stringify( answer ) ) );
                        })
                        .catch( ( error ) => {
                            console.log( error );
                        });
                        break;
                    
                    case WebRtcSignalingMessageType.ANSWER:
                        
                        this.rtcPeerConnection.setRemoteDescription( message.sessionDescription )
                        break;
                }
                break;
            
            case 'connected':
                // we are connected

                break;
        }
    }
}