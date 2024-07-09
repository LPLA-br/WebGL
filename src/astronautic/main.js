import * as THREE from 'three';
import { novaEsfera } from './esferas';
import { Camera } from './camera';
import { Controle } from './controle';

const scene = new THREE.Scene();

//A câmera é a espaçonave
const camera =  new Camera( 0.1, 0.1 , 0.1, 0, 0, 0, 0, 0, 25, new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ));
new Controle( camera ).executar();
camera.definirPosicao(0,0,10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camada01 = novaEsfera( 10, './texturas/terra.jpg', 1, scene );
const camada02 = novaEsfera( 10.1, './texturas/terraAtmosfera.jpg', 0.5, scene );

// https://threejs.org/docs/?q=light#api/en/lights/shadows/PointLightShadow
const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
scene.add( directionalLight );
directionalLight.position.set( - 1, 0, 1 ).normalize();
directionalLight.target = camada01;


// ambiente
function animate()
{
	requestAnimationFrame( animate );
	renderer.render( scene, camera.getCamera() );
  camera.moverCameraConformeVelocidade();
  camada01.rotateY( 0.001 );
  camada02.rotateY( 0.001 );
}

animate();
