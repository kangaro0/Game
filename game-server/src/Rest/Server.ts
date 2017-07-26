
import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";

import * as indexRoute from './Routes/Index';

export class Server {

    public app: express.Application;

    public static bootstrap( ): Server {
        return new Server();
    }

    constructor( ){
        this.app = express();

        this.config();
    }

    private config( ) {

    }

    private setupRoutes( ) {
        let router: express.Router = express.Router();

        var index: indexRoute.Route.Index = new indexRoute.Route.Index();

        router.get( '/', index.index.bind( index.index ) );

        this.app.use( router );
    } 
}
