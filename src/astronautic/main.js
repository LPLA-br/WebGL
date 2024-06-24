import * as THREE from 'three';
import { dados } from './dados';
import { novaEsfera } from './esferas';
import { definirSkyBox } from './decoracao';
import { Camera } from './camera';
import { Controle } from './controle';

const scene = new THREE.Scene();
definirSkyBox( scene );

//A câmera é a espaçonave
const camera =  new Camera( 0.1, 0.1 , 0.1, 0, 0, 0, 0, 0, 25, new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ));
new Controle( camera ).executar();

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// https://threejs.org/docs/?q=light#api/en/lights/shadows/PointLightShadow
const light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );

const sol      =  novaEsfera( dados, './texturas/sol.jpg', scene, "sol" );
novaEsfera( dados, './texturas/mercurio.jpg', scene, "mercurio" );
novaEsfera( dados, './texturas/venusAtmosfera.jpg', scene, "venus" );
novaEsfera( dados, './texturas/terraDiaSuperficie.jpg', scene, "terra" );
novaEsfera( dados, './texturas/marte.jpg', scene, "marte" );


sol.position.x = 0
sol.position.y = 0
sol.position.z = 0

// ambiente
function animate()
{
	requestAnimationFrame( animate );
	renderer.render( scene, camera.getCamera() );
  camera.moverCameraConformeVelocidade();
}

animate();
