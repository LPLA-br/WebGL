import * as THREE from 'three';
import { novaEsfera, novaEsferaInrregular } from './esferas';
//import { Camera } from './camera';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PerspectiveCamera } from 'three';

const scene = new THREE.Scene();

const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

const controls = new OrbitControls( camera, renderer.domElement );
document.body.appendChild( renderer.domElement );

const caminho01 = document.querySelector("#t1");
const caminho02 = document.querySelector("#t2");
const aplicar = document.querySelector("#aplicar");
const limpar = document.querySelector("#limpar");
const opacidade01 = document.querySelector("#opacidade01");
const opacidade02 = document.querySelector("#opacidade02");
const rotacionar = document.querySelector("#rotacao");
const luz = document.querySelector("#luz");

let objetos = [];
let opacidades = {
  camada01: 1,
  camada02: 0.5
};
let rotacao = true;
let tipoIluminacao = "direcional";
let iluminacao = new THREE.DirectionalLight( 0xffffff, 2 );

// ----------------------------------------------------------------------------------

objetos.push( novaEsferaInrregular( 10, '../public/terra.jpg','../public/TerraHeightmap.png',opacidades.camada01, 1, scene ) );
objetos.push( novaEsfera( 10.5, '../public/Oceano.png', opacidades.camada01, scene ) );
objetos.push( novaEsfera( 11, '../public/atmosfera.jpg', opacidades.camada02, scene ) );

// pontapé inicial na iluminação para tudo não ficar escuro.
iluminacao.target = objetos[0];
iluminacao.position.set( - 1, 0, 1 ).normalize();
scene.add( iluminacao );

function atualizarOpacidades()
{
  opacidades.camada01 = opacidade01.value;
  opacidades.camada02 = opacidade02.value;
}

function atualizarRotacao()
{
  rotacao = rotacionar.checked;
}

//alterarTipoLuz
luz.addEventListener("click", ()=>
{
  if ( tipoIluminacao == "omnidirecional" ) tipoIluminacao = "direcional";
  else if ( tipoIluminacao == "direcional" ) tipoIluminacao = "omnidirecional";

  if ( tipoIluminacao == "omnidirecional" )
  {
    scene.remove( iluminacao );
    iluminacao.dispose();
    iluminacao = new THREE.AmbientLight( 0xffffff, 2 );
    scene.add(iluminacao);
  }
  else
  {
    scene.remove(iluminacao);
    iluminacao = new THREE.DirectionalLight( 0xffffff, 2 );
    scene.add( iluminacao );
    iluminacao.position.set( - 1, 0, 1 ).normalize();
    iluminacao.target = objetos[0];
  }
    
}, false);

// removerObjetosAntigosEAdicionarNovos
aplicar.addEventListener("click", ()=>
{
  atualizarOpacidades();
  if ( objetos.length == 2 ) return;
  objetos.push( novaEsfera( 10, caminho01.value, opacidades.camada01, scene ) );
  objetos.push( novaEsfera( 10.1, caminho02.value, opacidades.camada02, scene ) );
  scene.add( objetos[0] );
  scene.add( objetos[1] );
},false);

//removerCamada
limpar.addEventListener("click", ()=>
{
  for ( let i = 0; i < objetos.length; i++ )
  {
    scene.remove( objetos.pop() );
  }
},false);


camera.position.set( 0, 100, 0 );
controls.update();

// ambiente
function animate()
{
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

  if ( objetos.length > 0 && rotacao == true)
  {
    for (let i = 0; i < objetos.length; i++)
    {
      objetos[i].rotateY( 0.001 );
    }
  }
  controls.update();
  atualizarRotacao();
}

animate();
