camera = undefined
scene = undefined
renderer = undefined
geometry = undefined
material = undefined
myShip = undefined
window.propulsion=.01
window.viscosity = .99

timeTravel = (matter,interval)->
  matter.velocity.add matter.accelleration
  matter.position.add matter.velocity
  matter.rotateX(matter.spin.x)
  matter.rotateY(matter.spin.y)
  matter.rotateZ(matter.spin.z)
  matter.accelleration.multiplyScalar viscosity*interval
  matter.spin.multiplyScalar viscosity
birth = (matter)->
  matter.velocity =new THREE.Vector3()
  matter.accelleration =new THREE.Vector3()
  matter.spin =new THREE.Vector3()


init = ->

  camera = new THREE.
    PerspectiveCamera(75, window.innerWidth / window.innerHeight, 3, 1000)
  camera.position.z = 200
  scene = new THREE.Scene
  geometry = new THREE.Geometry
  geometry.vertices.push top
  layer = n - 1
  d= 54
  n = 108
  a = 0
  h=10
  ϕ= (1+Math.sqrt(5))/2
  vs = ϕ * 2
  for i in [1..n]
    vs = ϕ /PI* i
    a=-PI
    b=2*PI/n*i
    while a < PI
      vertex = new THREE.Vector3
      vertex.x = sin(a+b) * d/4 + sin(b)* d/4
      vertex.y = cos(a+b) * d/4 +cos(b)* d/4
      vertex.z = a/PI*h
      #(a/ PI)* vs * d
      geometry.vertices.push vertex
      a+=PI/2764

      # or a / pi h



  material = new THREE.PointCloudMaterial(sizeAttenuation:false)
  myShip = new THREE.PointCloud(geometry, material)
  scene.add myShip
  birth(myShip)
  birth(camera)
  renderer = new THREE.WebGLRenderer()
  renderer.setSize window.innerWidth, window.innerHeight
  document.body.appendChild renderer.domElement
  return

animate = ->
  timeTravel(myShip,1)
  timeTravel(camera,1)
  requestAnimationFrame animate
  renderer.render scene, camera
  return

init()
animate()


document.onkeyup = (e) ->
  e = e or window.event
  charCode = if typeof e.which == 'number' then e.which else e.keyCode
  switch String.fromCharCode(charCode)
    when 'W' then myShip.accelleration.z+=propulsion
    when 'E' then myShip.accelleration.x+=propulsion
    when 'S' then myShip.velocity.multiplyScalar(0.1) #myShip.position.z--
    when 'A' then myShip.accelleration.y+=propulsion
    when 'D' then myShip.accelleration.y-=propulsion
    when 'X' then myShip.accelleration.z-=propulsion
    when 'Z' then myShip.accelleration.x-=propulsion
    when 'R' then myShip.spin.x=.1
    when 'F' then myShip.spin.y=.1
    when 'V' then myShip.spin.z=.1
    when 'T' then myShip.spin.x=-.1
    when 'G' then myShip.spin.y=-.1
    when 'B' then myShip.spin.z=-.1

  return
