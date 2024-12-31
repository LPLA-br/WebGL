import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PerspectiveCamera } from 'three';

const scene = new THREE.Scene();

const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

const controls = new OrbitControls( camera, renderer.domElement );
document.body.appendChild( renderer.domElement );

// ui com vertice alvo
const verticeElemento = document.querySelector("#vertice");
const valorElemento = document.querySelector("#valor");

function obterNumeroAleatorioEntreInclusivo(min, max)
{
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

// ----------------------------------------------------------------------------------
const geometria = new THREE.SphereGeometry( 15, 16, 16 );
const dadosPosicionais = geometria.attributes.position;

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
  else if ( modo == 1 )
  {
    /*cada vértice deve ser editado igualmente para os três eixos
    se quiser alterar-se alinhadamente com o centro da esfera.*/
    const novaDistanciaXYZ = obterNumeroAleatorioEntreInclusivo(14,16);
    const escalaX = novaDistanciaXYZ / distanciaCorrente;
    const escalaY = novaDistanciaXYZ / distanciaCorrente;
    const escalaZ = novaDistanciaXYZ / distanciaCorrente;
    x *= escalaX;
    y *= escalaY;
    z *= escalaZ;
  }
  dadosPosicionais.setXYZ(i, x, y, z);
}
dadosPosicionais.needsUpdate = true;

const materialGlobal = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
const esqueletoEsferico = new THREE.Mesh( geometria, materialGlobal ); //esqueleto
let material = new THREE.MeshBasicMaterial(
  {
    map: new THREE.TextureLoader().load( 'textures/Mars.jpg' ),
    overdraw: 0.5
  }
);

let objetoEspacial;

esqueletoEsferico.translateX(40);
scene.add( esqueletoEsferico );

// Programador burro descobre Heightmap de material 31 dez 2024
const geometriaNova = new THREE.SphereGeometry(20, 64, 64);
const materialNovo  = new THREE.MeshStandardMaterial(
  {
    color: 0x964800,
    displacementMap: new THREE.TextureLoader().load( '../public/Venus.png' ),
    map: new THREE.TextureLoader().load( '../public/Venus.png' ),
    displacementScale: 2,
    wireframe: false
  }
);
const esferaNova = new THREE.Mesh( geometriaNova, materialNovo );
scene.add(esferaNova);
const luzAmbiente = new THREE.AmbientLight(0xffffff, 2);
scene.add(luzAmbiente);


camera.position.set( 0, 100, 0 );
controls.update();

//incremento de vertice alvo
document.querySelector("#manipular").addEventListener( "click", ()=>
{
  if ( +verticeElemento.value < dadosPosicionais.count )
  {
    scene.remove( objetoEspacial );
    let verticeAlvoDoVandalismo = +verticeElemento.value;
    let x = dadosPosicionais.getX(verticeAlvoDoVandalismo);
    let y = dadosPosicionais.getY(verticeAlvoDoVandalismo);
    let z = dadosPosicionais.getZ(verticeAlvoDoVandalismo);

    const distanciaCorrente = Math.sqrt( x*x + y*y + z*z );

    const novaDistanciaXYZ = (distanciaCorrente + Number(valorElemento.value));
    const escalaX = novaDistanciaXYZ / distanciaCorrente;
    const escalaY = novaDistanciaXYZ / distanciaCorrente;
    const escalaZ = novaDistanciaXYZ / distanciaCorrente;
    x *= escalaX;
    y *= escalaY;
    z *= escalaZ;
    dadosPosicionais.setXYZ( verticeAlvoDoVandalismo, x, y, z);

    geometria.attributes.position.needsUpdate = true;
    objetoEspacial = new THREE.Mesh( geometria, material );
    scene.add( objetoEspacial );
  }
});

let wireframe = document.querySelector("#wireframe");
wireframe.addEventListener("click",()=>
{
  materialGlobal.wireframe = !materialGlobal.wireframe;
});

// ambiente
function animate()
{
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();
