import Angulo from "./angulo";

export default class CorpoAlternativo
{
  constructor( raio, posicaoX, posicaoY, velocidadeX, velocidadeY, massa )
  {
    this.raio = raio;
    this.velocidade = 0;
    this.angulo = new Angulo( 0.1 );
    this.posicaoX = posicaoX;
    this.posicaoY = posicaoY;
    this.velocidadex = velocidadeX;
    this.velocidadey = velocidadeY;
    this.massa = massa;
  }

  moverSe()
  {
    let rad = this.angulo.grausParaRadianos();
    this.velocidadex = this.velocidade * Math.cos( rad );
    this.velocidadey = this.velocidade * Math.sin( rad );
    this.posicaoX += this.velocidadex;
    this.posicaoY += this.velocidadey;
  }

  //TODO: refatorar
  lerEntradasPadronizadasParaUmaInstancia( literalEntradasExterno={} )
  {
    this.velocidade = Number(literalEntradasExterno.velocidade.value);
    this.angulo.definirNovoAngulo( Number(literalEntradasExterno.angulo.value) );
  }

  anguloAteOutroCorpo( outroCorpo )
  {
    //lado esquerdo positivo e direito negativo.
    let angulo = ((Math.atan2( (outroCorpo.posicaoX - this.posicaoX),(outroCorpo.posicaoY - this.posicaoY)))*180)/Math.PI;
    if ( angulo < 0 ) return (180 - Math.abs( angulo )) + 180;
    else return angulo;
  }

  determinarDistanciaParaOutroCorpo( outroCorpo )
  {
    if ( this.posicaoX == outroCorpo.posicaoX )
    {
      return Math.abs( this.posicaoY - outroCorpo.posicaoY );
    }
    else if ( this.posicaoY == outroCorpo.posicaoY )
    {
      return Math.abs( this.posicaoX - outroCorpo.posicaoX );
    }
    return Math.sqrt( ((outroCorpo.posicaoX - this.posicaoX)**2)+((outroCorpo.posicaoY - this.posicaoY)**2) );
  }

  // OBSOLETO !
  aceleracaoGravitacionalParaOutroCorpo( outroCorpo )
  {
    const mapa = this.angulo.mapearCirculoAngularParaOutroDiferente();
    console.log( mapa[Math.trunc(this.anguloAteOutroCorpo( outroCorpo ))] );
    this.angulo.definirNovoAngulo( mapa[Math.trunc(this.anguloAteOutroCorpo( outroCorpo ))] );
  }

};

