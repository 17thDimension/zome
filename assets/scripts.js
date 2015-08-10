var animate, init, onDocumentMouseMove, onDocumentTouchMove, onDocumentTouchStart, onWindowResize, render;

init = function() {
  var color, container, geometry, i, particles, size, sphere, sphereGeometry, sphereMaterial, vertex;
  container = document.createElement('div');
  document.body.appendChild(container);
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
  camera.position.z = 500;
  scene = new THREE.Scene;
  scene.fog = new THREE.FogExp2(0x000000, 0.00001);
  geometry = new THREE.Geometry;
  i = 0;
  while (i < 17000) {
    vertex = new THREE.Vector3;
    vertex.x = Math.cos(i)*i;
    vertex.y = Math.sin(i)*i ;
    vertex.z = Math.random()*i;
    geometry.vertices.push(vertex);
    i++;
  }
  parameters = [[[1, 1, 0.5], 5], [[0.55, 1, 0.5], 4], [[0.60, 1, 0.5], 3], [[0.85, .5, 0.5], 2], [[0.70, 1, 0.5], 1]];
  i = 0;
  while (i < parameters.length) {
    color = parameters[i][0];
    size = parameters[i][1];
    materials[i] = new THREE.PointCloudMaterial({
      size: size
    });
    particles = new THREE.PointCloud(geometry, materials[i]);
    particles.rotation.x = Math.sin(i) * 17;
    particles.rotation.y = Math.cos(i) * 17;
    particles.rotation.z = Math.sin(i) * 17;
    sphereGeometry = new THREE.SphereGeometry(100, 32, 32);
    sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff
    });
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    scene.add(particles);
    i++;
  }
  renderer = new THREE.WebGLRenderer({
    alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
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
  camera.position.x += (mouseX - camera.position.x) * 0.15;
  camera.position.y += (-mouseY - camera.position.y) * 0.15;
  camera.lookAt(scene.position);
  i = 0;
  while (i < scene.children.length) {
    object = scene.children[i];
    if (object instanceof THREE.PointCloud) {
      object.rotation.y = time * (i < 3 ? i + 1 : -(i + 2));
    }
    i++;
  }
  i = 0;
  while (i < materials.length) {
    color = parameters[i][0];
    h = 120 * (color[0] + time) % 360 / 360;
    materials[i].color.setHSL(h, color[1], color[2]);
    i++;
  }
  renderer.render(scene, camera);
};

if (!Detector.webgl) {
  Detector.addGetWebGLMessage();
}

window.container;

window.camera;

window.scene;

window.renderer;

window.particles;

window.geometry;

window.materials = [];

window.parameters;

window.i;

window.h;

window.color;

window.size;

window.mouseX = 0;

window.mouseY = 0;

window.windowHalfX = window.innerWidth / 2;

window.windowHalfY = window.innerHeight / 2;

document.addEventListener('DOMContentLoaded', function() {
  init();
  animate();
});
