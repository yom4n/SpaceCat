import './style.css'
import * as THREE from 'three';

import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls';


const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});


renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ( 5 );
camera.position.setX( 10 );

renderer.render( scene, camera );

//TORUS
const torusText = new THREE.TextureLoader().load('torus-text.jpg');

const geometry = new THREE.TorusGeometry( 3, 0.8, 16, 100 );
const material = new THREE.MeshBasicMaterial( {map: torusText} );
const torus = new THREE.Mesh( geometry, material );

torus.position.set(2.5, 0, 0);

scene.add(torus)

//2-LIGHT-SOURCES
const pointlight = new THREE.PointLight(0xFFFFFF);
pointlight.position.set(3, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointlight, ambientLight);

//LIGHT-POINTER_GRID
// const lightHelper = new THREE.PointLightHelper(pointlight);
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add( lightHelper, gridHelper );

const controls = new OrbitControls( camera, renderer.domElement );

//STARS
function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff} );
  const star = new THREE.Mesh( geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(50)); 

  star.position.set(x, y, z);
  scene.add(star);

};

Array(200).fill().forEach(addStar)

//BG
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


//CAM-MOVING
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  mars.rotation.x += 0.01;
  mars.rotation.y += 0.025;
  mars.rotation.z += 0.01;

  cat.rotation.y += 0.03;

  //spaceCatVenus.position.z -= 1;
  // serong.rotation.x += -0.01;

  // camera.position.z = t * -0.08;
  camera.position.x = t * 0.01;
  camera.position.y = t * -0.01;

}

document.body.onscroll = moveCamera;


//TORUS-ANIMATION
function animate(){
  requestAnimationFrame( animate );

  // torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;


  controls.update();

  renderer.render( scene, camera );
};

//CUBE
const cat1 = new THREE.TextureLoader().load('space-cat.jpg');

const cat = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshBasicMaterial( {map: cat1} )
);

cat.position.set(2.5, 0, 0)

scene.add(cat);


//CUBE 2
const cat2 = new THREE.TextureLoader().load('cat.jpg');

const spaceCat = new THREE.Mesh(
  new THREE.BoxGeometry(0.1, 6.4, 4),
  new THREE.MeshBasicMaterial( {map: cat2} )
);

spaceCat.rotation.x = -0.2
spaceCat.rotation.y = 0.2
spaceCat.rotation.z = -0.8

spaceCat.position.set(-3, 5, 7)

scene.add(spaceCat);


//CUBE 3
const cat3 = new THREE.TextureLoader().load('cat-venus.jpg');

const spaceCatVenus = new THREE.Mesh(
  new THREE.BoxGeometry(0.1, 6.4, 4),
  new THREE.MeshBasicMaterial( {map: cat3} )
);

spaceCatVenus.rotation.x = -0.2
spaceCatVenus.rotation.z = -0.8

spaceCatVenus.position.set(-11, 11, 8)

scene.add(spaceCatVenus);


//CUBE 4
const cat4 = new THREE.TextureLoader().load('kittens.jpg');

const spaceKitten = new THREE.Mesh(
  new THREE.BoxGeometry(0.1, 6.4, 4),
  new THREE.MeshBasicMaterial( {map: cat4} )
);
spaceKitten.rotation.x = -0
spaceKitten.rotation.y = 0.2
spaceKitten.rotation.z = -0.8


spaceKitten.position.set(-30, 28.5, -0.5)

scene.add(spaceKitten);




//MARS
const marsText = new THREE.TextureLoader().load('mars.jpg');
const marsNormal = new THREE.TextureLoader().load('mars-normal.jpg');

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(2.5, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: marsText,
    normalMap: marsNormal
    
  })
);

scene.add(mars);


mars.position.z = -1;
mars.position.y = 23;
mars.position.x = -24;


animate()   