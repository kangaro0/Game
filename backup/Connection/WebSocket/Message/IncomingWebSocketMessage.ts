
export enum IncomingWebSocketMessageType {
    NEW_CONNECTION,
    DATA
}

export class IncomingWebSocketMessage {

    private type: IncomingWebSocketMessageType;
    private data: Uint8Array | object;

    constructor( type: IncomingWebSocketMessageType, data: Uint8Array | object ){
        this.type = type;
        this.data = data;
    }

    public getType( ): IncomingWebSocketMessageType {
        return this.type;
    }

    public getData( ): Uint8Array | object {
        return this.data;
    }
}