
import { Server } from './Rest/Server';

export class Application {

    public static Server( ): Server {
        return Server.bootstrap( );
    }

}