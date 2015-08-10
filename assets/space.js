var animate, architectZome, birth, camera, geometry, init, material, positionCamera, renderer, scene, spaceShip, timeTravel, updateCamera, updateZome;

camera = void 0;

scene = void 0;

renderer = void 0;

geometry = void 0;

material = void 0;

spaceShip = void 0;

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

positionCamera = function() {
  camera.position.z = 30;
  camera.position.y = -50;
  return camera.rotateX(1);
};

architectZome = function(n, d, h, offset) {
  var a, b, i, j, layer, ref, vertex, ϕ;
  geometry = new THREE.Geometry;
  layer = n - 1;
  ϕ = (1 + Math.sqrt(5)) / 2;
  for (i = j = 1, ref = n; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
    a = offset;
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
  scene.remove(spaceShip);
  spaceShip = new THREE.PointCloud(geometry, material);
  scene.add(spaceShip);
  return birth(spaceShip);
};

init = function() {
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  scene = new THREE.Scene;
  birth(camera);
  positionCamera();
  updateZome();
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
};

updateZome = function() {
  var diameter, height, helixes, offset;
  helixes = parseFloat($('#helixes').val());
  diameter = parseFloat($('#diameter').val());
  height = parseFloat($('#height').val());
  offset = parseFloat($('#offset').val());
  return architectZome(helixes, diameter, height, offset);
};

updateCamera = function() {
  var offset, rotateX, rotateY, rotateZ;
  rotateX = parseFloat($('#helixes').val());
  rotateY = parseFloat($('#diameter').val());
  rotateZ = parseFloat($('#height').val());
  offset = parseFloat($('#offset').val());
  return architectZome(helixes, diameter, height, offset);
};

animate = function() {
  timeTravel(spaceShip, 1);
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
      spaceShip.accelleration.z += propulsion;
      break;
    case 'E':
      spaceShip.accelleration.x += propulsion;
      break;
    case 'S':
      spaceShip.velocity.multiplyScalar(0.1);
      break;
    case 'A':
      spaceShip.accelleration.y += propulsion;
      break;
    case 'D':
      spaceShip.accelleration.y -= propulsion;
      break;
    case 'X':
      spaceShip.accelleration.z -= propulsion;
      break;
    case 'Z':
      spaceShip.accelleration.x -= propulsion;
      break;
    case 'R':
      spaceShip.spin.x = .1;
      break;
    case 'F':
      spaceShip.spin.y = .1;
      break;
    case 'V':
      spaceShip.spin.z = .1;
      break;
    case 'T':
      spaceShip.spin.x = -.1;
      break;
    case 'G':
      spaceShip.spin.y = -.1;
      break;
    case 'B':
      spaceShip.spin.z = -.1;
  }
};
