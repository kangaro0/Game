
var Application = require( '../dist/Application' );
var http = require( 'http' );

var httpPort = normalizePort( process.env.port || 8080 );
var app = Application.Server().app;
app.set( 'port', httpPort );

var httpServer = http.createServer( app );
httpServer.listen( httpPort );
httpServer.on( 'error', onError );
httpServer.on( 'listening', onListening );


/* Helper functions */
function normalizePort( value ){
    var port = parseInt( value );

    if( isNaN( port ) )
        return val;

    if( port > 0 )
        return port;

    return false;
}

function onError( error ) {
    if ( error.syscall !== "listen" ) {
        throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    switch ( error.code ) {
        case "EACCES":
            console.error( bind + " requires elevated privileges" );
            process.exit( 1 );
            break;
        case "EADDRINUSE":
            console.error( bind + " is already in use" );
            process.exit( 1 );
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = httpServer.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log( "Listening on " + bind );
}