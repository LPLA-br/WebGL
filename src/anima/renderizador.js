import * as THREE from 'three';
import EntradaTeclado from './entradaTeclado';

export default class Renderizador
{
  constructor( materiaisGeometrias={} )
  {
    this.cena = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    this.camera.lookAt( new THREE.Vector3(0,0,0) );
    this.camera.position.set( 0, 110, 0 );

    this.renderizador = new THREE.WebGLRenderer();
    this.renderizador.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( this.renderizador.domElement );

    this.controle = new EntradaTeclado( this.camera );
    this.controle.executar();

    this.materiaisGeometrias = materiaisGeometrias;
    this.objetosAnimados = [];
    this.objetosInanimados = [];
  }

  adicionarMaterialGeometria( materialGeometricoInstancia={}, chave="" )
  {
    this.materiaisGeometrias[chave] = materialGeometricoInstancia;
  }

  adicionarObjetoAnimado( instanciaObjetoAnimado={} )
  {
    this.objetosAnimados.push(instanciaObjetoAnimado);
  }

  adicionarObjetoInanimado( instanciaObjetoInanimado={} )
  {
    this.objetosInanimados.push( instanciaObjetoInanimado );
  }

  adicionarObjetosInanimados( instanciasDosObjetosInanimados=[] )
  {
    for ( let i=0; i<instanciasDosObjetosInanimados.length; i++ )
    {
      this.objetosInanimados.push( instanciasDosObjetosInanimados[i] );
    }
  }

  adicionarTodosObjetosACena()
  {
    for ( let i=0; i<this.objetosAnimados.length; i++ )
    {
      this.cena.add( this.objetosAnimados[i].getCubo() );
    }
    for ( let i=0; i<this.objetosInanimados.length; i++ )
    {
      this.cena.add( this.objetosInanimados[i].getCubo() );
    }
  }

  renderizarInformacoesEspaciais()
  {
    const p = document.querySelector("#variaveis");
    setInterval(()=>{
      p.textContent = JSON.stringify(this.camera.position);
    }, 100);
  }

  renderizar()
  {
    this.renderizador.render( this.cena, this.camera );
    requestAnimationFrame( ()=>{this.renderizar()} );
  }

}

