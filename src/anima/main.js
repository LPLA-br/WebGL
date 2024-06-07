import * as THREE from 'three';
import Cubo from './cubo';
import EntradaTeclado from './entradaTeclado';
import SerVivo from './serVivo';

const cena = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderizador = new THREE.WebGLRenderer();

const controle = new EntradaTeclado( camera );
controle.executar();

renderizador.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderizador.domElement );

//MEMORIA
let blocos = [ new Cubo(1,1,1,1,1,1), new SerVivo() ];

function renderizarTodasEntidades( listaEntidades )
{
  for( let i = 0; i < listaEntidades.length; i++ )
  {
    cena.add( listaEntidades[i].getCubo() );
  }
}

renderizarTodasEntidades( blocos );

// movimentos de camera

function animate()
{
	requestAnimationFrame( animate );
	renderizador.render( cena, camera );
}
animate();
