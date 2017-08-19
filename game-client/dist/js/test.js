
// init chunk array with fake data
var chunks = new Array( 1024 );
var curChunk = 0, maxChunk = 1024;
for( ; curChunk < maxChunk ; curChunk++ ){
	chunks[ curChunk ] = { id: curChunk };
}

// Speicher fuer geladene Chunks
var loadedChunks = new Array(0);

function bringItOn() {

	// parameter
	var playerPosition = { x: 430, z: 226 };
	var chunkSize = 32;
	var radius = 3;
	
	console.log( 'Current ID: ' + ( Math.floor( playerPosition.z / chunkSize ) * chunkSize + Math.floor( playerPosition.x / chunkSize ) ) );

	var currentRadius = 1;
	for( ; currentRadius <= radius ; currentRadius++ ){
		
		var centerVector = new THREE.Vector2( Math.floor( playerPosition.x / chunkSize ) * chunkSize + 1/2 * chunkSize, Math.floor( playerPosition.z / chunkSize ) * chunkSize + 1/2 * chunkSize );
		var rotVector = centerVector.clone();
		rotVector.setComponent( 0, rotVector.x + chunkSize * currentRadius );	// set to initial coordinates of next chunk to load
		
		for( var curDir = 0; curDir < 4 ; curDir++ ){
			
			var angle = ( 90 * Math.PI / 180 ) / ( currentRadius + 1 )
		
			var currentBreak = 1, breaksPerRotation = currentRadius + 1;
			for( ; currentBreak <= breaksPerRotation ; currentBreak++ ){
				
				var x = Math.floor( rotVector.x / chunkSize );
				var z = Math.floor( rotVector.y / chunkSize );
				
				var id = z * chunkSize + x;
				console.log( 'ID: ' + id );
				
				if( id > -1 )
					loadedChunks.push( chunks[ id ] );
				
				rotVector.rotateAround( centerVector, angle );
			}
		}
	}
}