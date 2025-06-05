import CirculoDinamicoIdentificado from "./circuloDinamicoIdentificado";

export default class CirculoDinamicoIdentificadoIntegravel extends CirculoDinamicoIdentificado
{
  constructor( raio, posicaoX, posicaoY, velocidadeX, velocidadeY, aceleracaoX, aceleracaoY, massa, id="", deltaTempo=1.0)
  {
    super( raio, posicaoX, posicaoY, velocidadeX, velocidadeY, aceleracaoX, aceleracaoY, massa, id );
    this.posicaoXAnterior = this.posicaoX;
    this.posicaoYAnterior = this.posicaoY;
    this.posicaoAnterior = {x: this.posicaoX, y: this.posicaoY};
    this.deltaTempo = deltaTempo;
  }

  //protected
  salvarPosicaoAnterior()
  {
    this.posicaoXAnterior = this.posicaoAnterior.x;
    this.posicaoYAnterior = this.posicaoAnterior.y;
  }

  //sobrescrita
  moverSe()
  {
    // Método de Integração númerica Verlet
    this.posicaoAnterior = { x: this.posicaoX ,y: this.posicaoY };
    this.posicaoX = 2 * this.posicaoX - this.posicaoXAnterior + this.aceleracaoX * (this.deltaTempo * this.deltaTempo);
    this.posicaoY = 2 * this.posicaoY - this.posicaoYAnterior + this.aceleracaoY * (this.deltaTempo * this.deltaTempo);
    this.salvarPosicaoAnterior();
  }

};
