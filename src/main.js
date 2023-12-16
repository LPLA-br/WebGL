import * as THREE from 'three';

import { CorpoCelesteEsferico } from './planeta';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

document.addEventListener("keydown", aoBaixarDeUmaTecla, false);
async function aoBaixarDeUmaTecla( event ) 
{
  const VELOCIDADE = 0.1;
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

// diametro relativo ao da terra (regra de 3)
const sol = new CorpoCelesteEsferico( 109.18, './texturas/sol.jpg', 'sol' ).get_esfera();
const terra = new CorpoCelesteEsferico( 1,'./texturas/terraDiaSuperficie.jpg', 'terra' ).get_esfera();
const venus = new CorpoCelesteEsferico( 0.94, './texturas/venusAtmosfera.jpg', 'venus' ).get_esfera();

scene.add( sol );
scene.add( terra );
scene.add( venus );

// ambiente
function animate()
{
	requestAnimationFrame( animate );
  terra.rotation.y += 0.001;
  //terra.position.x += 0.001;
  sol.position.x = 110;
  venus.position.x = 5;
	renderer.render( scene, camera );
}

animate();
