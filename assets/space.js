var animate, birth, camera, geometry, init, material, myShip, renderer, scene, timeTravel;

camera = void 0;

scene = void 0;

renderer = void 0;

geometry = void 0;

material = void 0;

myShip = void 0;

window.propulsion = .01;

window.viscosity = .99;

timeTravel = function(matter, interval) {
  matter.velocity.add(matter.accelleration);
  matter.position.add(matter.velocity);
  matter.rotateX(matter.spin.x);
  matter.rotateY(matter.spin.y);
  matter.rotateZ(matter.spin.z);
  matter.accelleration.multiplyScalar(viscosity * interval);
  return matter.spin.multiplyScalar(viscosity);
};

birth = function(matter) {
  matter.velocity = new THREE.Vector3();
  matter.accelleration = new THREE.Vector3();
  return matter.spin = new THREE.Vector3();
};

init = function() {
  var a, b, d, h, i, j, layer, n, ref, vertex, vs, ϕ;
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 3, 1000);
  camera.position.z = 200;
  scene = new THREE.Scene;
  geometry = new THREE.Geometry;
  geometry.vertices.push(top);
  layer = n - 1;
  d = 54;
  n = 108;
  a = 0;
  h = 10;
  ϕ = (1 + Math.sqrt(5)) / 2;
  vs = ϕ * 2;
  for (i = j = 1, ref = n; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
    vs = ϕ / PI * i;
    a = -PI;
    b = 2 * PI / n * i;
    while (a < PI) {
      vertex = new THREE.Vector3;
      vertex.x = sin(a + b) * d / 4 + sin(b) * d / 4;
      vertex.y = cos(a + b) * d / 4 + cos(b) * d / 4;
      vertex.z = a / PI * h;
      geometry.vertices.push(vertex);
      a += PI / 2764;
    }
  }
  material = new THREE.PointCloudMaterial({
    sizeAttenuation: false
  });
  myShip = new THREE.PointCloud(geometry, material);
  scene.add(myShip);
  birth(myShip);
  birth(camera);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
};

animate = function() {
  timeTravel(myShip, 1);
  timeTravel(camera, 1);
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

init();

animate();

document.onkeyup = function(e) {
  var charCode;
  e = e || window.event;
  charCode = typeof e.which === 'number' ? e.which : e.keyCode;
  switch (String.fromCharCode(charCode)) {
    case 'W':
      myShip.accelleration.z += propulsion;
      break;
    case 'E':
      myShip.accelleration.x += propulsion;
      break;
    case 'S':
      myShip.velocity.multiplyScalar(0.1);
      break;
    case 'A':
      myShip.accelleration.y += propulsion;
      break;
    case 'D':
      myShip.accelleration.y -= propulsion;
      break;
    case 'X':
      myShip.accelleration.z -= propulsion;
      break;
    case 'Z':
      myShip.accelleration.x -= propulsion;
      break;
    case 'R':
      myShip.spin.x = .1;
      break;
    case 'F':
      myShip.spin.y = .1;
      break;
    case 'V':
      myShip.spin.z = .1;
      break;
    case 'T':
      myShip.spin.x = -.1;
      break;
    case 'G':
      myShip.spin.y = -.1;
      break;
    case 'B':
      myShip.spin.z = -.1;
  }
};
