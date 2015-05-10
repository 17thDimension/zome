
      if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

      var container;
      var camera, scene, renderer, particles, geometry, materials = [], parameters, i, h, color, size;
      var mouseX = 0, mouseY = 0;

      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;

      document.addEventListener('DOMContentLoaded', function(){
        init();
        animate();
      });

      function init() {

        container = document.createElement( 'div' );
        document.body.appendChild( container );

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
        camera.position.z = 500;

        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2( 0x000000, 0.00001 );

        geometry = new THREE.Geometry();

        for ( i = 0; i < 1700; i ++ ) {

          var vertex = new THREE.Vector3();
          vertex.x = Math.cos(i) * 170  ;
          vertex.y = Math.sin(i) * 170 ;
          vertex.z = Math.tan(i) * 170 ;

          geometry.vertices.push( vertex );

        }

        parameters = [
          [ [1, 1, 0.5], 5 ],
          [ [0.55, 1, 0.5], 4 ],
          [ [0.60, 1, 0.5], 3 ],
          [ [0.85, .5, 0.5], 2 ],
          [ [0.70, 1, 0.5], 1 ]
        ];

        for ( i = 0; i < parameters.length; i ++ ) {

          color = parameters[i][0];
          size  = parameters[i][1];

          materials[i] = new THREE.PointCloudMaterial( { size: size } );

          particles = new THREE.PointCloud( geometry, materials[i] );

          particles.rotation.x = Math.random() * 3;
          particles.rotation.y = Math.random() * 3;
          particles.rotation.z = Math.random() * 3;


          var sphereGeometry = new THREE.SphereGeometry( 100, 32, 32 );
          var sphereMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff} );
          var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
          scene.add( sphere );
          scene.add( particles );

        }

        renderer = new THREE.WebGLRenderer( { alpha: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( 0x000000, 0 ); // the default
        container.appendChild( renderer.domElement );


        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );

        //

        window.addEventListener( 'resize', onWindowResize, false );

      }

      function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

      }

      function onDocumentMouseMove( event ) {

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;

      }

      function onDocumentTouchStart( event ) {

        if ( event.touches.length === 1 ) {

          event.preventDefault();

          mouseX = event.touches[ 0 ].pageX - windowHalfX;
          mouseY = event.touches[ 0 ].pageY - windowHalfY;

        }

      }

      function onDocumentTouchMove( event ) {

        if ( event.touches.length === 1 ) {

          event.preventDefault();

          mouseX = event.touches[ 0 ].pageX - windowHalfX;
          mouseY = event.touches[ 0 ].pageY - windowHalfY;

        }

      }

      //

      function animate() {

        requestAnimationFrame( animate );

        render();

      }

      function render() {

        var time = Date.now() * 0.00005;

        camera.position.x += ( mouseX - camera.position.x ) * 0.15;
        camera.position.y += ( - mouseY - camera.position.y ) * 0.15;

        camera.lookAt( scene.position );

        for ( i = 0; i < scene.children.length; i ++ ) {

          var object = scene.children[ i ];

          if ( object instanceof THREE.PointCloud ) {

            object.rotation.y = time * ( i < 3 ? i + 1 : - ( i + 2 ) );

          }

        }

        for ( i = 0; i < materials.length; i ++ ) {

          color = parameters[i][0];

          h = ( 120 * ( color[0] + time ) % 360 ) / 360;
          materials[i].color.setHSL( h, color[1], color[2] );

        }

        renderer.render( scene, camera );

      }
