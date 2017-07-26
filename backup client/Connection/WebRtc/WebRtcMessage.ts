
export enum WebRtcSignalingMessageType {
    CANDIDATE = 0,
    OFFER = 1,
    ANSWER = 2
}

export class WebRtcSignalingMessage {

    public type: WebRtcSignalingMessageType;
    public candidate: RTCIceCandidate;
    public sessionDescription: RTCSessionDescription;
}