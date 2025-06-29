/* DEFINIÇÃO MAIS SIMPLES POSSÍVEL DE UM CORPO GENERICO
 * OBSERVAÇÕES: Refatorar com foco na responsabilidade única
 * */
import Radiano from "./radiano";
import AleatNum from "./aleatNum";

export default class CirculoDinamico
{
  constructor( raio, posicaoX, posicaoY, velocidadeX, velocidadeY, aceleracaoX, aceleracaoY, massa )
  {
    this.AleatNum = new AleatNum();
    this.raio = raio;
    this.posicaoX = (typeof posicaoX == 'undefined')  ? this.AleatNum.obterNumeroAleatorioEntre(0,500) : posicaoX ;
    this.posicaoY =  (typeof posicaoY == 'undefined') ? this.AleatNum.obterNumeroAleatorioEntre(0,500) : posicaoY ;
    this.velocidadeX = velocidadeX;
    this.velocidadeY = velocidadeY;
    this.aceleracaoX = aceleracaoX;
    this.aceleracaoY = aceleracaoY;
    this.massa = massa;

    this.radiano = new Radiano();
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

  //TODO: Reavaliar se métodos abaixo condizem com comportamentos de "CirculoDinamico"

  distanciaParaOutro( outro=undefined )
  {
    if ( outro === undefined ) return 0.0;
    return Math.sqrt( (this.posicaoX - outro.posicaoX)**2 + (this.posicaoY - outro.posicaoY)**2 );
  }

  senoRelativoParaOutro( outro )
  {
    let hipotenusa = this.distanciaParaOutro( outro );
    let oposto = 0;

    if ( this.posicaoY > outro.posicaoY )
    {
      oposto = this.posicaoY - outro.posicaoY;
    }
    else
    {
      oposto = outro.posicaoY - this.posicaoY;
    }
    return oposto/hipotenusa;
  }

  cossenoRelativoParaOutro( outro )
  {
    let hipotenusa = this.distanciaParaOutro( outro );
    let adjacente = 0;

    if ( this.posicaoX > outro.posicaoX )
    {
      adjacente = this.posicaoX - outro.posicaoX;
    }
    else
    {
      adjacente = outro.posicaoX - this.posicaoX;
    }

    return adjacente/hipotenusa;
  }

  // identifica em qual quadrante do outro objeto "this.estou"
  identificarQuadranteRelativoDoOutro( outro )
  {
    if ( this.posicaoX > outro.posicaoX && this.posicaoY > outro.posicaoY )
    {
      return 4;
    }
    else if ( this.posicaoX < outro.posicaoX && this.posicaoY > outro.posicaoY )
    {
      return 3;
    }
    else if ( this.posicaoX < outro.posicaoX && this.posicaoY < outro.posicaoY )
    {
      return 2;
    }
    else if ( this.posicaoX > outro.posicaoX && this.posicaoY < outro.posicaoY   )
    {
      return 1;
    }
    return 1;
  }

  // retorna direção correta para outro objeto em graus
  corrigirEObterDirecaoPara( outro )
  {
    let quadrante = this.identificarQuadranteRelativoDoOutro( outro );
    switch( quadrante )
    {
      case 1:
        return this.radiano.radianosParaGraus(Math.asin(Math.abs(this.senoRelativoParaOutro(outro))));
      case 2:
        return Math.abs(this.radiano.radianosParaGraus(Math.asin(Math.abs(this.senoRelativoParaOutro(outro))))-90)+90
      case 3:
        return Math.abs(this.radiano.radianosParaGraus(Math.asin(Math.abs(this.senoRelativoParaOutro(outro)))))+180
      case 4:
        return Math.abs(this.radiano.radianosParaGraus(Math.asin(Math.abs(this.senoRelativoParaOutro(outro))))-360)
      default:
        return 0;
    }
  }

  acelerarArbritariamenteParaObjeto( aceleracao=0.01, outro )
  {
    let quadranteRelativoAOutro =  this.identificarQuadranteRelativoDoOutro( outro );
    switch( quadranteRelativoAOutro )
    {
      case 1:
        this.distribuirAceleracaoPorQuadrante( aceleracao, quadranteRelativoAOutro, outro );
        break;
      case 2:
        this.distribuirAceleracaoPorQuadrante( aceleracao, quadranteRelativoAOutro, outro );
        break;
      case 3:
        this.distribuirAceleracaoPorQuadrante( aceleracao, quadranteRelativoAOutro, outro );
        break;
      case 4:
        this.distribuirAceleracaoPorQuadrante( aceleracao, quadranteRelativoAOutro, outro );
        break;
    }
  }

  // corrige direcao da aceleração vetorial do móvel subordinado por quadrante relativo ao objeto subordinador.
  distribuirAceleracaoPorQuadrante( aceleracao, quadrante, outroObjeto )
  {
    switch( quadrante )
    {
      case 1:
        this.aceleracaoX = (aceleracao*-1) * this.cossenoRelativoParaOutro( outroObjeto );
        this.aceleracaoY = aceleracao * this.senoRelativoParaOutro( outroObjeto );
        break;
      case 2:
        this.aceleracaoX = aceleracao * this.cossenoRelativoParaOutro( outroObjeto );
        this.aceleracaoY = aceleracao * this.senoRelativoParaOutro( outroObjeto );
        break;
      case 3:
        this.aceleracaoX = aceleracao * this.cossenoRelativoParaOutro( outroObjeto );
        this.aceleracaoY = (aceleracao*-1) * this.senoRelativoParaOutro( outroObjeto );
        break;
      case 4:
        this.aceleracaoX = (aceleracao*-1) * this.cossenoRelativoParaOutro( outroObjeto );
        this.aceleracaoY = (aceleracao*-1) * this.senoRelativoParaOutro( outroObjeto );
        break;
    }
  }

  //Alternativa não empregada
  corrigirEObterDirecaoPara2( outro )
  {
    if ( outro.posicaoY < this.posicaoY )
    {
      return this.direcaoParaOutroObjeto( outro );
    }
    else if ( outro.posicaoY > this.posicaoY )
    {
      return this.direcaoParaOutroObjeto( outro ) + 180;
    }
  }

  //Alternativa não empregada
  direcaoParaOutroObjeto( outro )
  {
    return Math.atan2( outro.posicaoY - this.posicaoY, outro.posicaoX - this.posicaoX ) * 180/Math.PI;
  }

};

