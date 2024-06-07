import { BoxGeometry, MeshBasicMaterial, Mesh, CubeTextureLoader } from "three";

/**
 * Representação física cubo
 * */
export default class Cubo
{
  constructor( largura, altura, profundidade, posicaox, posicaoy, posicaoz )
  {
    this.geometria = new BoxGeometry(
      largura,
      altura,
      profundidade
    );
    this.material  = new MeshBasicMaterial( {color:0x00ff00} );
    this.cubo      = new Mesh( this.geometria, this.material );

    this.cubo.position.x = posicaox;
    this.cubo.position.y = posicaoy;
    this.cubo.position.z = posicaoz;
  }

  getCubo()
  {
    return this.cubo;
  }

  definirTexturaSuperficie( nomeTextura )
  {
    const fonte = new CubeTextureLoader().setPath( "./texturas/" );
    const textura = fonte.load( [ nomeTextura, nomeTextura, nomeTextura, nomeTextura, nomeTextura ] );
    this.material = new MeshBasicMaterial( { color:0x00ff00, envMap: textura } );
  }
};

