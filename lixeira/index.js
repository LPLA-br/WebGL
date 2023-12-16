import * as THREE from 'three';

class Cubo
{
  constructor( altura, largura, profundidade )
  {
    this.largura = largura;
    this.altura = altura;
    this.profundidade = profundidade;

    this.geometry = new THREE.BoxGeometry( largura, altura, profundidade );
    this.material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    this.cubo = new THREE.Mesh( this.geometry, this.material );
  }

  retornarCubo()
  {
    return this.cubo;
  }

}

class Cena
{
  constructor( fov=75 )
  {
    this.cena = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(fov, window.innerWidth/window.innerHeight, 0.1, 1000 );
    this.renderizador = new THREE.WebGLRenderer();

    this.renderizador.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderizador.domElement );

    this.cubo;

    this.camera.position.z = 5;
  }

  adicionarObjeto( objeto )
  {
    this.cubo = objeto;
    this.cena.add( objeto );
  }

  animar()
  {
    requestAnimationFrame( this.animar.bind() );

    this.cubo.rotation.x += 0.01;
    this.cubo.rotation.y += 0.01;

    this.renderizador.render( this.cena, this.camera );
  }

  animate() {
    requestAnimationFrame( this.animate );
    this.renderizador.render( this.cena, this.camera );
  }
};

const cena = new Cena(50);
cena.adicionarObjeto( new Cubo(1,1,1).retornarCubo() );
cena.animate();

