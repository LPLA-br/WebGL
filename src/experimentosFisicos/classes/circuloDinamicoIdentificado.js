import CirculoDinamico from "./circuloDinamico";

export default class CirculoDinamicoIdentificado extends CirculoDinamico
{
  constructor( raio, posicaoX, posicaoY, velocidadeX, velocidadeY, aceleracaoX, aceleracaoY, massa, id="")
  {
    super( raio, posicaoX, posicaoY, velocidadeX, velocidadeY, aceleracaoX, aceleracaoY, massa )
    this.identificador = id;
  }
};
