
var THREE = require('three');
var utils = require('../Utils');

import { HeightGenerator } from './HeightGenerator';

interface Options {
    worldSize: number;
    chunkSize: number;
    voxelSize: VoxelSize;
    scale: number;
    maxExpansion: number;
    sealevel: number;
}

interface VoxelSize {
    x: number;
    y: number;
    z: number;
}

interface Material {
    name: String;
    color: number[];
}

module VoxelEngine {

    export class World {

        private worldSize: number;
        private chunkSize: number;
        private voxelSize: VoxelSize;
        private scale: number;
        private sealevel: number;
        private maxExpansion: number;

        private chunks: Chunk[];
        private materials: Material[];

        private heightGenerator: HeightGenerator;

        constructor(options: Options) {
            this.worldSize = options.worldSize;
            this.chunkSize = options.chunkSize;
            this.voxelSize = options.voxelSize;
            this.scale = options.scale;
            this.sealevel = options.sealevel;

            this.maxExpansion = options.maxExpansion;

            this.chunks = [];

            this.materials = [
                {
                    name: 'air',
                    color: [0, 0, 0]
                },
                {
                    name: 'grass',
                    color: [0.28 * 255, 0.98 * 255, 0.17 * 255]
                },
                {
                    name: 'dirt',
                    color: [0.98 * 255, 0.57 * 255, 0.26 * 255]
                },
                {
                    name: 'stone',
                    color: [0.75 * 255, 0.7 * 255, 0.7 * 255]
                },
                {
                    name: 'detail',
                    color: [0.0 * 255, 0.0 * 255, 0.1 * 255]
                },
                {
                    name: 'detail2',
                    color: [255, 0, 0]
                }
            ];

            this.initChunks();
        }

        getChunkCount() { 
            return this.chunks.length;
        }

        getChunkById( id ) {
            return this.chunks[ id ];
        }

        generateWorld() {
            var current = 0;
            var chunkCount = this.chunks.length;

            for( ; current < 8 ; current++ ){
                this.chunks[ current ] = this.generate( this.chunks[ current ], null );
            }
        }

        private initChunks() {
            var voxelCount = Math.pow( this.worldSize, 3 ); // this.worldSize: chunkCount per side, 3D

            for( var i = 0; i < voxelCount; i++  ){
                this.chunks.push( new Chunk( i, this.chunkSize ));
            }
        }

        private generate( chunk: Chunk, biomefunction ): Chunk {
            
            var chunkId = chunk.getId();
            var chunkSize = chunk.getSize();

            var offset_x = ( chunkId * chunkSize ) % ( this.maxExpansion * chunkSize );
            var offset_z = Math.floor( chunkId / this.maxExpansion ) * chunkSize;

            // move to constructor
            this.heightGenerator = new HeightGenerator( 
                0,              // low
                50,            // high
                5,              // octaves
                0.02,           // scale
                1,              // persistence
                chunkSize       // chunkSize
            );
            // generate heights
            this.heightGenerator.generateHeights( this.maxExpansion * this.chunkSize, this.maxExpansion * chunkSize, 10 );

            var matrix = new THREE.Matrix4();

            var light = new THREE.Color( 0xffffff );
			var shadow = new THREE.Color( 0x505050 );

            // generate basic geometries
            var pxGeometry  = new THREE.PlaneGeometry( this.voxelSize.x, this.voxelSize.x );
            pxGeometry.faces[ 0 ].vertexColors = [ light, shadow, light ];
			pxGeometry.faces[ 1 ].vertexColors = [ shadow, shadow, light ];
			pxGeometry.faceVertexUvs[ 0 ][ 0 ][ 0 ].y = 0.5;
			pxGeometry.faceVertexUvs[ 0 ][ 0 ][ 2 ].y = 0.5;
			pxGeometry.faceVertexUvs[ 0 ][ 1 ][ 2 ].y = 0.5;
			pxGeometry.rotateY( Math.PI / 2 );
			pxGeometry.translate( this.voxelSize.x / 2, 0, 0 );

            var nxGeometry = new THREE.PlaneGeometry( this.voxelSize.x, this.voxelSize.x );
			nxGeometry.faces[ 0 ].vertexColors = [ light, shadow, light ];
			nxGeometry.faces[ 1 ].vertexColors = [ shadow, shadow, light ];
			nxGeometry.faceVertexUvs[ 0 ][ 0 ][ 0 ].y = 0.5;
			nxGeometry.faceVertexUvs[ 0 ][ 0 ][ 2 ].y = 0.5;
			nxGeometry.faceVertexUvs[ 0 ][ 1 ][ 2 ].y = 0.5;
			nxGeometry.rotateY( - Math.PI / 2 );
			nxGeometry.translate( - this.voxelSize.x / 2, 0, 0 );
			
            var pyGeometry = new THREE.PlaneGeometry( this.voxelSize.x, this.voxelSize.x );
			pyGeometry.faces[ 0 ].vertexColors = [ light, light, light ];
			pyGeometry.faces[ 1 ].vertexColors = [ light, light, light ];
			pyGeometry.faceVertexUvs[ 0 ][ 0 ][ 1 ].y = 0.5;
			pyGeometry.faceVertexUvs[ 0 ][ 1 ][ 0 ].y = 0.5;
			pyGeometry.faceVertexUvs[ 0 ][ 1 ][ 1 ].y = 0.5;
			pyGeometry.rotateX( - Math.PI / 2 )
			pyGeometry.translate( 0, this.voxelSize.x / 2, 0 );
			
            var py2Geometry = new THREE.PlaneGeometry( 100, 100 );
			py2Geometry.faces[ 0 ].vertexColors = [ light, light, light ];
			py2Geometry.faces[ 1 ].vertexColors = [ light, light, light ];
			py2Geometry.faceVertexUvs[ 0 ][ 0 ][ 1 ].y = 0.5;
			py2Geometry.faceVertexUvs[ 0 ][ 1 ][ 0 ].y = 0.5;
			py2Geometry.faceVertexUvs[ 0 ][ 1 ][ 1 ].y = 0.5;
			py2Geometry.rotateX( - Math.PI / 2 );
			py2Geometry.rotateY( Math.PI / 2 );
            py2Geometry.translate( 0, this.voxelSize.y / 2, 0 );

            var pzGeometry = new THREE.PlaneGeometry( this.voxelSize.x, this.voxelSize.x );
			pzGeometry.faces[ 0 ].vertexColors = [ light, shadow, light ];
			pzGeometry.faces[ 1 ].vertexColors = [ shadow, shadow, light ];
			pzGeometry.faceVertexUvs[ 0 ][ 0 ][ 0 ].y = 0.5;
			pzGeometry.faceVertexUvs[ 0 ][ 0 ][ 2 ].y = 0.5;
			pzGeometry.faceVertexUvs[ 0 ][ 1 ][ 2 ].y = 0.5;
			pzGeometry.translate( 0, 0, this.voxelSize.x / 2 );
			
            var nzGeometry = new THREE.PlaneGeometry( this.voxelSize.x, this.voxelSize.x );
			nzGeometry.faces[ 0 ].vertexColors = [ light, shadow, light ];
			nzGeometry.faces[ 1 ].vertexColors = [ shadow, shadow, light ];
			nzGeometry.faceVertexUvs[ 0 ][ 0 ][ 0 ].y = 0.5;
			nzGeometry.faceVertexUvs[ 0 ][ 0 ][ 2 ].y = 0.5;
			nzGeometry.faceVertexUvs[ 0 ][ 1 ][ 2 ].y = 0.5;
			nzGeometry.rotateY( Math.PI );
			nzGeometry.translate( 0, 0, - this.voxelSize.x / 2 );

            var geometry = new THREE.Geometry();
            var dummy = new THREE.Mesh();

            var x = 0;
            for( ; x < chunkSize ; x++ ){
                var z = 0;
                for( ; z < chunkSize ; z++ ){

                    console.log( 'X: ' + x + ', Z: ' + z );

                    var height = this.heightGenerator.getHeight( offset_x + x, offset_z + z );

                    matrix.makeTranslation(
						( offset_x + x ) * this.voxelSize.x,
						height * this.voxelSize.y,
						( offset_z + z ) * this.voxelSize.z
					);

                    
                    var px = this.heightGenerator.getHeight( offset_x + x + 1, offset_z + z );
					var nx = this.heightGenerator.getHeight( offset_x + x - 1, offset_z + z );
					var pz = this.heightGenerator.getHeight( offset_x + x, offset_z + 1 );
					var nz = this.heightGenerator.getHeight( offset_x + x, offset_z + z - 1 );

                    var nxnz = this.heightGenerator.getHeight( offset_x + x + 1, offset_z + z + 1 );
					var pxnz = this.heightGenerator.getHeight( offset_x + x - 1, offset_z + z + 1 );
					var nxpz = this.heightGenerator.getHeight( offset_x + x + 1, offset_z + z - 1 );
					var pxpz = this.heightGenerator.getHeight( offset_x + x - 1, offset_z + z - 1 );

                    var a = nx > height || nz > height || nxnz > height ? 0 : 1;
					var b = nx > height || pz > height || nxpz > height ? 0 : 1;
					var c = px > height || pz > height || pxpz > height ? 0 : 1;
					var d = px > height || nz > height || pxnz > height ? 0 : 1;

					if ( a + c > b + d ) {

						var colors = py2Geometry.faces[ 0 ].vertexColors;
						colors[ 0 ] = b === 0 ? shadow : light;
						colors[ 1 ] = c === 0 ? shadow : light;
						colors[ 2 ] = a === 0 ? shadow : light;

						var colors = py2Geometry.faces[ 1 ].vertexColors;
						colors[ 0 ] = c === 0 ? shadow : light;
						colors[ 1 ] = d === 0 ? shadow : light;
						colors[ 2 ] = a === 0 ? shadow : light;

						geometry.merge( py2Geometry, matrix );

					} else {

						var colors = pyGeometry.faces[ 0 ].vertexColors;
						colors[ 0 ] = a === 0 ? shadow : light;
						colors[ 1 ] = b === 0 ? shadow : light;
						colors[ 2 ] = d === 0 ? shadow : light;

						var colors = pyGeometry.faces[ 1 ].vertexColors;
						colors[ 0 ] = b === 0 ? shadow : light;
						colors[ 1 ] = c === 0 ? shadow : light;
						colors[ 2 ] = d === 0 ? shadow : light;

						geometry.merge( pyGeometry, matrix );

					}

					if ( ( px != height && px != height + 1 ) || x == 0 ) {

						var colors = pxGeometry.faces[ 0 ].vertexColors;
						colors[ 0 ] = pxpz > px && x > 0 ? shadow : light;
						colors[ 2 ] = pxnz > px && x > 0 ? shadow : light;

						var colors = pxGeometry.faces[ 1 ].vertexColors;
						colors[ 2 ] = pxnz > px && x > 0 ? shadow : light;

						geometry.merge( pxGeometry, matrix );

					}

					if ( ( nx != height && nx != height + 1 ) || x == chunkSize - 1 ) {

						var colors = nxGeometry.faces[ 0 ].vertexColors;
						colors[ 0 ] = nxnz > nx && x < chunkSize - 1 ? shadow : light;
						colors[ 2 ] = nxpz > nx && x < chunkSize - 1 ? shadow : light;

						var colors = nxGeometry.faces[ 1 ].vertexColors;
						colors[ 2 ] = nxpz > nx && x < chunkSize - 1 ? shadow : light;

						geometry.merge( nxGeometry, matrix );

					}

					if ( ( pz != height && pz != height + 1 ) || z == chunkSize - 1 ) {

						var colors = pzGeometry.faces[ 0 ].vertexColors;
						colors[ 0 ] = nxpz > pz && z < chunkSize - 1 ? shadow : light;
						colors[ 2 ] = pxpz > pz && z < chunkSize - 1 ? shadow : light;

						var colors = pzGeometry.faces[ 1 ].vertexColors;
						colors[ 2 ] = pxpz > pz && z < chunkSize - 1 ? shadow : light;

						geometry.merge( pzGeometry, matrix );

					}

					if ( ( nz != height && nz != height + 1 ) || z == 0 ) {

						var colors = nzGeometry.faces[ 0 ].vertexColors;
						colors[ 0 ] = pxnz > nz && z > 0 ? shadow : light;
						colors[ 2 ] = nxnz > nz && z > 0 ? shadow : light;

						var colors = nzGeometry.faces[ 1 ].vertexColors;
						colors[ 2 ] = nxnz > nz && z > 0 ? shadow : light;

						geometry.merge( nzGeometry, matrix );

					}
                }
            }

			//geometry.computeBoundingSphere();

            var texture = new THREE.TextureLoader().load( 'textures/minecraft/atlas.png' );
			texture.magFilter = THREE.NearestFilter;
			texture.minFilter = THREE.LinearMipMapLinearFilter;

            chunk.surface = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { map: texture, vertexColors: THREE.VertexColors } ) );

            return chunk;
        }
    }
            /* OLD
                // for testing
            var voxelCount = Math.pow( chunk.getSize(), 3 );
            var current = 0;
            for( ; current < voxelCount ; current++ ){
                


                
                var simplex = new SimplexNoise( Math.random );

                // generate geometries
                var currentGeometryIndex = 0, maxGeometryIndex = this.chunkSize * this.chunkSize;
                for( ; currentGeometryIndex < maxGeometryIndex ; currentGeometryIndex++ ){

                    var geometry = new THREE.BoxGeometry( this.voxelSize.x, this.voxelSize.y, this.voxelSize.z );
                    
                    // translate
                    var x = currentGeometryIndex % this.chunkSize;
                    var z = Math.floor( currentGeometryIndex / this.chunkSize );
                    //geometry.translate( x, 0, z );

                    var bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );
                    geometries[ currentGeometryIndex ] = bufferGeometry;
                }

                var x = chunkOffsetX;
                for( ; x < chunkSize ; x++ ) {
                    var y = chunkOffsetY;
                    for( ; y < 1 ; y++ ) {
                        var z = chunkOffsetZ;
                        for( ; z < chunkSize ; z++ ) {

                            var multi = 1;
                            var frequency = 0.025;

                            var minHeight = 5;

                            var noise = multi * simplex.noise2D( frequency * x, frequency * z ); 
                            noise = ( noise + 1 ) / 2;

                            var elevation = Math.ceil( noise * this.voxelSize.y );

                            var texture = new THREE.TextureLoader().load( './textures/orange.gif' );

                            var material = new THREE.MeshBasicMaterial({ 
                                map: texture
                            });

                            var mesh = new THREE.Mesh( geometries[ x * z ], material );
                            mesh.position.x = x * 10;
                            mesh.position.y = elevation * 10;
                            mesh.position.z = z * 10;

                            chunk.voxels.add( mesh );

                        }
                    }
                }

                var curGeometryIndex = 0;
                var maxGeometryIndex = geometries.length;
                for( ; curGeometryIndex < maxGeometryIndex ; curGeometryIndex++ ){

                    

                }

                */

    class Chunk {

        private id: number;
        private size: number;
        private currentSize: number;

        public surface: THREE.Mesh;

        public voxels: THREE.Group;
        //private light: Uint8Array;

        constructor( id, size ) {
            this.id = id;
            this.size = size;

            this.voxels = new THREE.Group();
        }

        public getSize() {
            return this.size;
        }

        public getId(){
            return this.id;
        }

        /*        private initChunk( ) {
            
            for( var x = 0; x < this.size; x++ ){
                for( var y = 0; y < this.size; y++ ){
                    for( var z = 0; z < this.size; z++ )

                    var geometry = new THREE.BoxGeometry( 10, 5, 10);

                    //this.voxels.add()
                }
            }
        */

    }   
}

module.exports = VoxelEngine;