camera = undefined
scene = undefined
renderer = undefined
geometry = undefined
material = undefined
spaceShip = undefined
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

positionCamera = ->
  camera.position.z = 30
  camera.position.y=-50
  camera.rotateX(1)

architectZome = (n,d,h,offset) ->
  geometry = new THREE.Geometry
  layer = n - 1
  ϕ = (1+Math.sqrt(5))/2
  for i in [1..n]
    a=offset
    b=2*PI/n*i
    while a < PI
      vertex = new THREE.Vector3
      vertex.x = sin(a+b) * d/4 + sin(b)* d/4
      vertex.y = cos(a+b) * d/4 +cos(b)* d/4
      vertex.z = a/PI*h
      #(a/ PI)* vs * d
      geometry.vertices.push vertex
      a+=PI/2764
  material = new THREE.PointCloudMaterial(sizeAttenuation:false)
  scene.remove(spaceShip)
  spaceShip = new THREE.PointCloud(geometry, material)
  scene.add spaceShip
  birth(spaceShip)

init = ->

  camera = new THREE.
    PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
  scene = new THREE.Scene
  birth(camera)
  positionCamera()
  updateZome()
  renderer = new THREE.WebGLRenderer()
  renderer.setSize window.innerWidth, window.innerHeight
  document.body.appendChild renderer.domElement
  return
updateZome = ->
  helixes = parseFloat $('#helixes').val()
  diameter = parseFloat $('#diameter').val()
  height = parseFloat $('#height').val()
  offset = parseFloat $('#offset').val()
  architectZome(helixes,diameter,height,offset)
updateCamera = ->
  rotateX = parseFloat $('#helixes').val()
  rotateY = parseFloat $('#diameter').val()
  rotateZ = parseFloat $('#height').val()
  offset = parseFloat $('#offset').val()
  architectZome(helixes,diameter,height,offset)


animate = ->
  timeTravel(spaceShip,1)
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
    when 'W' then spaceShip.accelleration.z+=propulsion
    when 'E' then spaceShip.accelleration.x+=propulsion
    when 'S' then spaceShip.velocity.multiplyScalar(0.1) #spaceShip.position.z--
    when 'A' then spaceShip.accelleration.y+=propulsion
    when 'D' then spaceShip.accelleration.y-=propulsion
    when 'X' then spaceShip.accelleration.z-=propulsion
    when 'Z' then spaceShip.accelleration.x-=propulsion
    when 'R' then spaceShip.spin.x=.1
    when 'F' then spaceShip.spin.y=.1
    when 'V' then spaceShip.spin.z=.1
    when 'T' then spaceShip.spin.x=-.1
    when 'G' then spaceShip.spin.y=-.1
    when 'B' then spaceShip.spin.z=-.1

  return
