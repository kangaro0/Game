
import { WebRtcSignalingMessage, WebRtcSignalingMessageType } from './WebRtcMessage';

import { DataUtilities } from '../../Utilities/DataUtilities';

export class WebRtcSignalingMessageFactory {

    private endianess: boolean;

    public static SIGNALING_START( ) {

    }

    public static produceBinary( type: WebRtcSignalingMessageType , data: string ): Uint8Array {

        var toReturn = new Uint8Array( 1 + data.length * 2 );
        var dataView = new DataView( toReturn.buffer, toReturn.byteOffset, toReturn.byteLength );

        switch( type ){
            
            case WebRtcSignalingMessageType.CANDIDATE:
                dataView.setUint8( 0, WebRtcSignalingMessageType.CANDIDATE );
                break;

            case WebRtcSignalingMessageType.OFFER: 
                dataView.setUint8( 0, WebRtcSignalingMessageType.OFFER );
                break;
            
            case WebRtcSignalingMessageType.ANSWER:
                dataView.setUint8( 0, WebRtcSignalingMessageType.ANSWER );
                break;

        }

        DataUtilities.StringToUint8Array( data, toReturn, 1 );

        return toReturn;
    }

    public static produceMessage( data: Uint8Array ): WebRtcSignalingMessage {

        var dataView = new DataView( data.buffer, data.byteOffset, data.byteLength );

        var message = new WebRtcSignalingMessage();

        message.type = dataView.getUint8( 0 );
        
        switch( message.type ){
            case WebRtcSignalingMessageType.CANDIDATE: 
                message.candidate = new RTCIceCandidate( DataUtilities.Uint8ArrayToString( data, 1 ) );
                break;

            case WebRtcSignalingMessageType.OFFER:
                message.sessionDescription = new RTCSessionDescription( DataUtilities.Uint8ArrayToString( data, 1 ) );
                break;

            case WebRtcSignalingMessageType.ANSWER:
                message.sessionDescription = new RTCSessionDescription( DataUtilities.Uint8ArrayToString( data, 1 ) );
                break;
        }

        return message;
    }

    private static getEndianess( ){
        var arrayBuffer = new ArrayBuffer(2);
        var uint8Array = new Uint8Array(arrayBuffer);
        var uint16array = new Uint16Array(arrayBuffer);

        uint8Array[0] = 0xAA;
        uint8Array[1] = 0xBB;

        if(uint16array[0] === 0xBBAA) return true;
        if(uint16array[0] === 0xAABB) return false;

        else throw new Error("Something crazy just happened");
    }
}