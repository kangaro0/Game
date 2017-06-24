
export interface IObserver {
    receive( data?: any ): void;
}

export interface IObservable {
    register( observer: IObserver ): void;
    unregister( observer: IObserver ): void;
    notify( data?: any ): void;
}