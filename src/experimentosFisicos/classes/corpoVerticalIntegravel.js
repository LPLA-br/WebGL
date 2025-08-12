import CorpoVertical from './corpoVertical';

export default class CorpoVerticalIntegravel extends CorpoVertical
{
  constructor( raio, posicaoX, posicaoY, vy, aceleracaoY )
  {
    super( raio, posicaoX, posicaoY, vy, aceleracaoY  );
    this.tempo = 0.0;
    this.delta_t = 0.1;
  }

  //overwrite
  moverSe()
  {
    this.tempo += this.delta_t;
    this.posicaoY += this.velocidadeY * this.delta_t + (1/2) * this.aceleracaoY * (this.delta_t**2);
    this.velocidadeY += this.aceleracaoY * this.delta_t;
  }

  //overwrite
  acelerar()
  {
    return;
  }
}
