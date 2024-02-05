import * as THREE from 'three';
import { dados } from './dados';
import { velocidade, alterarAceleracao } from './fisica';
import { adicionarCuboDeTeste, novaEsfera } from './geometricos';
import { definirSkyBox } from './decoracao';
import { Camera } from './camera';

const scene = new THREE.Scene();
definirSkyBox( scene );

//A câmera é a espaçonave
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
let cmr = new Camera( 0, 0, 0, 0, 0, 0, 0, 0, 0 );

document.addEventListener("keydown", aoBaixarDeUmaTecla, false);
async function aoBaixarDeUmaTecla( event ) 
{
  let keyCode = event.which;
  const teclas =
  {
    w:87 , s:83 , d:68 , a:65, //translacao
    r:82, t:84,                // azimute
    f: 70, g: 71,              // atitude
    q: 81, z:90                //ascenção
  };

  switch( keyCode )
  {
    case teclas.q:
      cmr.aceleracaoY = alterarAceleracao( cmr.aceleracaoY, 0.01 );
      break;
    case teclas.z:
      cmr.aceleracaoY = alterarAceleracao( cmr.aceleracaoY, -0.01 );
      break;
    case teclas.w:
      cmr.aceleracaoX = alterarAceleracao( cmr.aceleracaoX, 0.01 );
      break;
    case teclas.a:
      cmr.aceleracaoZ = alterarAceleracao( cmr.aceleracaoZ, 0.01 );
      break;
    case teclas.s:
      cmr.aceleracaoX =  alterarAceleracao( cmr.aceleracaoX, -0.01 );
      break;
    case teclas.d:
      cmr.aceleracaoZ = alterarAceleracao( cmr.aceleracaoZ, -0.01 );
      break;
    case teclas.r:
      camera.rotateY(0.1);
      break;
    case teclas.t:
      camera.rotateY(-0.1);
      break;
    case teclas.f:
      camera.rotateX(-0.1);
      break;
    case teclas.g:
      camera.rotateX(0.1);
      break;
    default:
      break
  }
};

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// https://threejs.org/docs/?q=light#api/en/lights/shadows/PointLightShadow
const light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );

const mercurio =  novaEsfera( dados, './texturas/mercurio.jpg', scene, "mercurio" );
const venus =     novaEsfera( dados, './texturas/venusAtmosfera.jpg', scene, "venus" );
const terra =     novaEsfera( dados, './texturas/terraDiaSuperficie.jpg', scene, "terra" );
const marte =     novaEsfera( dados, './texturas/marte.jpg', scene, "marte" );

adicionarCuboDeTeste( scene );

mercurio.position.x = dados.mercurio.perigeu;
venus.position.x =    dados.venus.perigeu;
terra.position.x =    dados.terra.perigeu;
marte.position.x =    dados.marte.perigeu;

// ambiente
function animate()
{
	requestAnimationFrame( animate );
  terra.rotation.y += 0.001;
  venus.position.x = 5;
	renderer.render( scene, camera );


  //camera move-se constantemente.
  camera.position.x += velocidade( cmr.posicaoX, cmr.velocidadeX, cmr.aceleracaoX );
  camera.position.z += velocidade( cmr.posicaoZ, cmr.velocidadeZ, cmr.aceleracaoZ );
  camera.position.y += velocidade( cmr.posicaoY, cmr.velocidadeY, cmr.aceleracaoY );
}

animate();
