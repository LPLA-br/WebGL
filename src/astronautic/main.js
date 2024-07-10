import * as THREE from 'three';
import { novaEsfera } from './esferas';
import { Camera } from './camera';
import { Controle } from './controle';

const scene = new THREE.Scene();

//A câmera é a espaçonave
const camera =  new Camera( 0.1, 0.1 , 0.1, 0, 0, 0, 0, 0, 25, new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ));
new Controle( camera ).executar();
camera.definirPosicao(0,0,20);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const caminho01 = document.querySelector("#t1");
const caminho02 = document.querySelector("#t2");
const aplicar = document.querySelector("#aplicar");
const limpar = document.querySelector("#limpar");

let objetos = [];

objetos.push( novaEsfera( 10, './texturas/terra.jpg', 1, scene ) );
objetos.push( novaEsfera( 10.1, './texturas/terraAtmosfera.jpg', 0.5, scene ) );

aplicar.addEventListener("click", ()=>
{
  if ( objetos.length == 2 ) return;
  objetos.push( novaEsfera( 10, './texturas/' + caminho01.value, 1, scene ) );
  objetos.push( novaEsfera( 10.1, './texturas/' + caminho02.value, 0.5, scene ) );
  scene.add( objetos[0] );
  scene.add( objetos[1] );
},false);

limpar.addEventListener("click", ()=>
{
  for ( let i = 0; i < objetos.length; i++ )
  {
    scene.remove( objetos.pop() );
  }
},false);

// https://threejs.org/docs/?q=light#api/en/lights/shadows/PointLightShadow
const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
scene.add( directionalLight );
directionalLight.position.set( - 1, 0, 1 ).normalize();
directionalLight.target = objetos[0];


// ambiente
function animate()
{
	requestAnimationFrame( animate );
	renderer.render( scene, camera.getCamera() );
  camera.moverCameraConformeVelocidade();
  if ( objetos.length > 0 )
  {
    for (let i = 0; i < objetos.length; i++)
    {
      objetos[i].rotateY( 0.001 );
    }
  }
}

animate();
