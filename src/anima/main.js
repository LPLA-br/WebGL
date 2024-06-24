import * as THREE from 'three';
import EntradaTeclado from './entradaTeclado';
import SerVivo from './serVivo';
import Solo from './solo';
import Terreno from './terreno';

import MaterialGeometrico from './materialGeometrico';

const cena = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderizador = new THREE.WebGLRenderer();

renderizador.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderizador.domElement );

const controle = new EntradaTeclado( camera );
controle.executar();


//MEMÓRIA
let materialEGeometria = {
  soloCubico: new MaterialGeometrico( 10,10,10, 'dirt.png' ),
  serVivoCubico: new MaterialGeometrico( 10,10,10, 'serVivo.png' )
};
let animados = [ new SerVivo( 50, 110, 50, materialEGeometria.serVivoCubico ) ];
const geradorTerreno = new Terreno( 100, 100, 100, materialEGeometria.soloCubico );
geradorTerreno.gerarTerreno( Solo );
let inanimados = geradorTerreno.getTerreno();

function renderizarTodasEntidades( listaEntidades )
{
  for( let i = 0; i < listaEntidades.length; i++ )
  {
    cena.add( listaEntidades[i].getCubo() );
  }
}

renderizarTodasEntidades( animados );
renderizarTodasEntidades( inanimados );

function animate()
{
	requestAnimationFrame( animate );
	renderizador.render( cena, camera );
}
animate();
