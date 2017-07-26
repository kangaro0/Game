
var renderer, camera, light, scene, controls, ambientLight, dirLight, clock;

window.onload = function () {

    /*
    var world = new VoxelEngine.World({
        worldSize: 32,
        chunkSize: 64,
        voxelSize: {
            x: 10,
            y: 10,
            z: 10
        },
        scale: 1,
        maxExpansion: 64,
        sealevel: 35
    });

    function init( ) {

        clock = new THREE.Clock();
        scene = new THREE.Scene();
        
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.z = 200;
        camera.position.y = 200;
        scene.add( camera );

        controls = new THREE.FlyControls( camera );

        controls.movementSpeed = 1000;
		controls.domElement = document.body;
		controls.rollSpeed = Math.PI / 24;
		controls.autoForward = false;
		controls.dragToLook = false;

        dirLight = new THREE.DirectionalLight( 0xffffff );
		dirLight.position.set( -1, 0, 1 ).normalize();
        scene.add( dirLight );

        ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
        scene.add( ambientLight );

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth , window.innerHeight );
        renderer.setClearColor( 0xEEEEEE );
        document.body.appendChild( renderer.domElement );   

        var height = 512;
        var size_y = 512;


        world.generateWorld();
        
        var current = 0;
        var chunkCount = world.getChunkCount();

    }
    

    function render() {
        requestAnimationFrame( render );

        renderer.render( scene, camera );

        var delta = clock.getDelta();
        controls.movementSpeed = 50;
		controls.update( delta );
        
    }
    */
    
}