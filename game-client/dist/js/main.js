
var renderer, camera, light, scene, controls, ambientLight, dirLight, clock;

window.onload = function () {

    var world = new VoxelEngine.World({
        worldSize: 32,
        chunkSize: 64,
        voxelSize: {
            x: 10,
            y: 10,
            z: 10
        },
        scale: 1,
        maxExpansion: 4,
        sealevel: 35
    });

    function init( ) {

        clock = new THREE.Clock();
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2( 0xffffff, 0.00015 );
        
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.z = 200;
        camera.position.y = 60;
        scene.add( camera );

        controls = new THREE.FlyControls( camera );

        controls.movementSpeed = 1000;
		controls.lookSpeed = 0.125;
		controls.lookVertical = true;
		controls.constrainVertical = true;
		controls.verticalMin = 1.1;
		controls.verticalMax = 2.2;

        dirLight = new THREE.DirectionalLight( 0xffffff );
		dirLight.position.set( 32, 5, 32);
        dirLight.lookAt( new THREE.Vector3( 32, 0, 32 ) );
        scene.add( dirLight );

        ambientLight = new THREE.AmbientLight( 0xcccccc ); // soft white light

        scene.add( ambientLight );

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth , window.innerHeight );
        renderer.setClearColor( 0xffffff );
        document.body.appendChild( renderer.domElement );   

        var height = 512;
        var size_y = 512;


        world.generateWorld();
        
        var current = 0;
        var chunkCount = world.getChunkCount();

        // only load one chunk
        for( ; current < 8 ; current++ ){
            scene.add( world.getChunkById( current ).surface );
        }
        // */

    }

    function render() {
        requestAnimationFrame( render );

        renderer.render( scene, camera );

        var delta = clock.getDelta();
        controls.movementSpeed = 50;
		controls.update( delta );
        
    }

    init();

    render();
}