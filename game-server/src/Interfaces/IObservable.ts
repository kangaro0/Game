import { IObserver } from './IObserver';

export interface IObservable {
    register( observer: IObserver ): void;
    unregister( observer: IObserver ): void;
    notify( data?: any ): void;
}