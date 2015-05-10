var animate, camera, color, container, geometry, h, i, init, materials, mouseX, mouseY, onDocumentMouseMove, onDocumentTouchMove, onDocumentTouchStart, onWindowResize, parameters, particles, render, renderer, scene, size, windowHalfX, windowHalfY;

init = function() {
  var camera, color, container, geometry, i, parameters, particles, renderer, scene, size, vertex;
  container = document.createElement('div');
  document.body.appendChild(container);
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
  camera.position.z = 1000;
  scene = new THREE.Scene;
  scene.fog = new THREE.FogExp2(0x000000, 0.0007);
  geometry = new THREE.Geometry;
  i = 0;
  while (i < 20000) {
    vertex = new THREE.Vector3;
    vertex.x = Math.random() * 2000 - 1000;
    vertex.y = Math.random() * 2000 - 1000;
    vertex.z = Math.random() * 2000 - 1000;
    geometry.vertices.push(vertex);
    i++;
  }
  parameters = [[[1, 1, 0.5], 5], [[0.95, 1, 0.5], 4], [[0.90, 1, 0.5], 3], [[0.85, 1, 0.5], 2], [[0.80, 1, 0.5], 1]];
  i = 0;
  while (i < parameters.length) {
    color = parameters[i][0];
    size = parameters[i][1];
    materials[i] = new THREE.PointCloudMaterial({
      size: size
    });
    particles = new THREE.PointCloud(geometry, materials[i]);
    particles.rotation.x = Math.random() * 6;
    particles.rotation.y = Math.random() * 6;
    particles.rotation.z = Math.random() * 6;
    scene.add(particles);
    i++;
  }
  renderer = new THREE.WebGLRenderer;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('touchstart', onDocumentTouchStart, false);
  document.addEventListener('touchmove', onDocumentTouchMove, false);
  window.addEventListener('resize', onWindowResize, false);
};

onWindowResize = function() {
  var windowHalfX, windowHalfY;
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

onDocumentMouseMove = function(event) {
  var mouseX, mouseY;
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
};

onDocumentTouchStart = function(event) {
  var mouseX, mouseY;
  if (event.touches.length === 1) {
    event.preventDefault();
    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
};

onDocumentTouchMove = function(event) {
  var mouseX, mouseY;
  if (event.touches.length === 1) {
    event.preventDefault();
    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
};

animate = function() {
  requestAnimationFrame(animate);
  render();
};

render = function() {
  var color, h, i, object, time;
  time = Date.now() * 0.00005;
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);
  i = 0;
  while (i < scene.children.length) {
    object = scene.children[i];
    if (object instanceof THREE.PointCloud) {
      object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
    }
    i++;
  }
  i = 0;
  while (i < materials.length) {
    color = parameters[i][0];
    h = 360 * (color[0] + time) % 360 / 360;
    materials[i].color.setHSL(h, color[1], color[2]);
    i++;
  }
  renderer.render(scene, camera);
};

if (!Detector.webgl) {
  Detector.addGetWebGLMessage();
}

container = void 0;

camera = void 0;

scene = void 0;

renderer = void 0;

particles = void 0;

geometry = void 0;

materials = [];

parameters = void 0;

i = void 0;

h = void 0;

color = void 0;

size = void 0;

mouseX = 0;

mouseY = 0;

windowHalfX = window.innerWidth / 2;

windowHalfY = window.innerHeight / 2;

document.addEventListener('DOMContentLoaded', function() {
  init();
  animate();
});
