import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PerspectiveCamera } from 'three';

const scene = new THREE.Scene();

const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

const controls = new OrbitControls( camera, renderer.domElement );
document.body.appendChild( renderer.domElement );

// ----------------------------------------------------------------------------------
const geometry = new THREE.SphereGeometry( 15, 16, 16 );
const geometryII = new THREE.SphereGeometry( 15, 16, 16 );

const dadosPosicionais = geometry.attributes.position;
const dadosPosicionaisII = geometryII.attributes.position;

for ( let i=0; i<dadosPosicionais.count; i++ )
{
  let x = dadosPosicionaisII.getX(i);
  let y = dadosPosicionaisII.getY(i);
  let z = dadosPosicionaisII.getZ(i);

  const distanciaCorrente = Math.sqrt( x*x + y*y + z*z );
  console.log(distanciaCorrente);

  const novaDistanciaX = 3;
  const novaDistanciaY = 6;
  const novaDistanciaZ = 9;
  const escalaX = novaDistanciaX / distanciaCorrente;
  const escalaY = novaDistanciaY / distanciaCorrente;
  const escalaZ = novaDistanciaZ / distanciaCorrente;
  x *= escalaX;
  y *= escalaY;
  z *= escalaZ;

  dadosPosicionaisII.setXYZ(i, x, y, z);
}

let modo = 1;
for ( let i=0; i<dadosPosicionais.count; i++ )
{
  let x = dadosPosicionais.getX(i);
  let y = dadosPosicionais.getY(i);
  let z = dadosPosicionais.getZ(i);

  const distanciaCorrente = Math.sqrt( x*x + y*y + z*z );

  if ( i == 69 && modo == 0 )
  {
    //demonstração de alinhamento.
    const novaDistanciaX = 69;
    const escalaX = novaDistanciaX / distanciaCorrente;
    x *= escalaX;
  }
  else if ( i == 69 && modo == 1 )
  {
    /*cada vértice deve ser editado igualmente para os três eixos
    se quiser alterar-se alinhadamente com o centro da esfera.*/
    const novaDistanciaX = 69;
    const novaDistanciaY = 69;
    const novaDistanciaZ = 69;
    const escalaX = novaDistanciaX / distanciaCorrente;
    const escalaY = novaDistanciaY / distanciaCorrente;
    const escalaZ = novaDistanciaZ / distanciaCorrente;
    x *= escalaX;
    y *= escalaY;
    z *= escalaZ;
  }

  dadosPosicionais.setXYZ(i, x, y, z);
}

dadosPosicionais.needsUpdate = true;

const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
const sphere = new THREE.Mesh( geometry, material );

const sphereII = new THREE.Mesh( geometryII, material );
sphereII.translateX( 100 );

scene.add( sphere );
scene.add( sphereII );

camera.position.set( 0, 100, 0 );
controls.update();

let wireframe = document.querySelector("#wireframe");
wireframe.addEventListener("click",()=>
{
  material.wireframe = !material.wireframe;
});

// ambiente
function animate()
{
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();
