import * as THREE from 'three';
import { corpo } from './dados';

import { CorpoCelesteEsferico } from './planeta';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

document.addEventListener("keydown", aoBaixarDeUmaTecla, false);
async function aoBaixarDeUmaTecla( event ) 
{
  let VELOCIDADE = 0.1;
  let keyCode = event.which;

  if (keyCode == 87) //w
  {
    camera.position.z -= VELOCIDADE;
  }
  else if (keyCode == 83) //s
  {
    camera.position.z += VELOCIDADE;
  }
  else if (keyCode == 68 ) //d
  {
    camera.position.x += VELOCIDADE;
  }
  else if (keyCode == 65 ) //a
  {
    camera.position.x -= VELOCIDADE;
  }
  else if( keyCode == 82 ) //r
  {
    camera.rotation.y += VELOCIDADE;
  }
  else if( keyCode == 84 ) //t
  {
    camera.rotation.y -= VELOCIDADE;
  }
};

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const sol = new CorpoCelesteEsferico( corpo, './texturas/sol.jpg', 'sol' ).get_esfera();
const mercurio = new CorpoCelesteEsferico( corpo, './texturas/mercurio.jpg', 'mercurio' ).get_esfera();
const venus = new CorpoCelesteEsferico( corpo, './texturas/venusAtmosfera.jpg', 'venus' ).get_esfera();
const terra = new CorpoCelesteEsferico( corpo, './texturas/terraDiaSuperficie.jpg', 'terra' ).get_esfera();
const marte = new CorpoCelesteEsferico( corpo, './texturas/marte.jpg', 'marte' ).get_esfera();


scene.add( sol );
  sol.position.x = corpo.sol.perigeu;
scene.add( mercurio );
  mercurio.position.x = corpo.mercurio.perigeu;
scene.add( venus );
  venus.position.x = corpo.venus.perigeu;
scene.add( terra );
  terra.position.x = corpo.terra.perigeu;
scene.add( marte );
  marte.position.x = corpo.marte.perigeu;

// ambiente
function animate()
{
	requestAnimationFrame( animate );
  terra.rotation.y += 0.001;
  venus.position.x = 5;
	renderer.render( scene, camera );
}

animate();
