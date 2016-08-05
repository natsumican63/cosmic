var renderer, scene, camera, text, particle, mouseX=0, mouseY=0, mouseZ=0;

window.onload = function() {
  init();
  animate();
}

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  document.getElementById('canvas').appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 300;
  scene.add(camera);

  particle = new THREE.Object3D();

  scene.add(particle);

  var geometry = new THREE.TetrahedronGeometry(0.4, 1);
  var material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  });

  for (var i = 0; i < 1000; i++) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    mesh.position.multiplyScalar(90 + (Math.random() * 700));
    mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    particle.add(mesh);
  }

  var textGeometry = new THREE.TextGeometry( 'COSMIC', {
                  size: 40, height: 10, curveSegments: 3,
                  font:'droid sans', weight: "bold", style: "normal",
  });
  var textMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: true,
    side: THREE.DoubleSide
  });

  text = new THREE.Mesh( textGeometry, textMaterial );

  scene.add(text);

  var ambientLight = new THREE.AmbientLight(0x999999 );
  scene.add(ambientLight);
  
  var lights = [];
  lights[0] = new THREE.DirectionalLight( 0x71ff71, 1 );
  lights[0].position.set( 1, 0, 0 );
  lights[1] = new THREE.DirectionalLight( 0x11E8BB, 1 );
  lights[1].position.set( 0.75, 1, 0.5 );
  lights[2] = new THREE.DirectionalLight( 0x8200C9, 1 );
  lights[2].position.set( -1, 1, 0.5 );

  scene.add( lights[0] );
  scene.add( lights[1] );
  scene.add( lights[2] );

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('mousemove', onDocumentMouseMove, false);
  window.addEventListener('mousedown', onDocumentMouseDown,  false);
};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(e) {
  mouseX = e.clientX - window.innerWidth /2;
  mouseY = e.clientY - window.innerHeight /2;
}

function onDocumentMouseDown(e) {
  mouseX = e.clientX - window.innerWidth;
  mouseY = e.clientY - window.innerHeight;
}


function animate() {
  requestAnimationFrame(animate);

  particle.rotation.x += 0.0000;
  particle.rotation.y -= 0.0040;

  text.rotation.x += 0.0000;
  text.rotation.y += 0.0020;

  renderer.clear();

  render();
  
};

function render() {
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (mouseY - camera.position.y) * 0.05;

  camera.lookAt(scene.position);
  renderer.render( scene, camera );
}