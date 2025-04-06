/* CORPO CUJO MOVIMENTO É VERTICAL */

export default class CorpoVertical
{
  constructor( raio, posicaoX=100, posicaoY=100, vy=0, aceleracaoY=100 )
  {
    this.raio = raio;
    this.posicaoY = posicaoY;
    this.posicaoX = posicaoX;
    this.velocidadeY = vy;
    this.aceleracaoY = aceleracaoY;
  }

  moverSe()
  {
    this.posicaoY += this.velocidadeY;
  }

  acelerar()
  {
    this.velocidadeY += this.aceleracaoY;
  }

  impactar( distanciaLimite )
  {
    if( this.posicaoY > distanciaLimite )
    {
      this.aceleracaoY = 0;
      this.velocidadeY = 0;
    }
  }

  redefinir( posicaoY=100, aceleracaoY=0 )
  {
    this.posicaoY = posicaoY;
    this.velocidadeY = 0;
    this.aceleracaoY = aceleracaoY;
  }
}
