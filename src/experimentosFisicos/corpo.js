/* DEFINIÇÃO MAIS SIMPLES POSSÍVEL DE UM CORPO GENERICO */

/* direção determinada por interação entre velocidades X e Y */
export default class Corpo
{
  constructor( raio, posicaoX, posicaoY, velocidadeX, velocidadeY, ax, ay, m )
  {
    this.raio = raio;
    this.posicaoX = (typeof posicaoX == 'undefined')  ? this.obterNumeroAleatorioEntre(0,500) : posicaoX ;
    this.posicaoY =  (typeof posicaoY == 'undefined') ? this.obterNumeroAleatorioEntre(0,500) : posicaoY ;
    this.velocidadeX = velocidadeX;
    this.velocidadeY = velocidadeY;
    this.aceleracaoX = ax;
    this.aceleracaoY = ay;
    this.massa = m;
  }

  moverSe()
  {
    this.posicaoX += this.velocidadeX;
    this.posicaoY += this.velocidadeY;
  }

  acelerar()
  {
    this.velocidadeX += this.aceleracaoX;
    this.velocidadeY += this.aceleracaoY;
  }

  //TODO: SEGREGATURO
  obterNumeroAleatorioEntre( max, min )
  {
    return Math.floor( (Math.random() * (max - min + 1)) ) + min ;
  }
};

