/* DEFINIÇÃO MAIS SIMPLES POSSÍVEL DE UM CORPO GENERICO */

/* direção determinada por interação entre velocidades X e Y */
export default class CirculoDinamico
{
  constructor( raio, posicaoX, posicaoY, velocidadeX, velocidadeY, aceleracaoX, aceleracaoY, massa )
  {
    this.raio = raio;
    this.posicaoX = (typeof posicaoX == 'undefined')  ? this.obterNumeroAleatorioEntre(0,500) : posicaoX ;
    this.posicaoY =  (typeof posicaoY == 'undefined') ? this.obterNumeroAleatorioEntre(0,500) : posicaoY ;
    this.velocidadeX = velocidadeX;
    this.velocidadeY = velocidadeY;
    this.aceleracaoX = aceleracaoX;
    this.aceleracaoY = aceleracaoY;
    this.massa = massa;
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

  // identifica em qual quadrante o outro objeto está
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

  correcaoDirecionalParaOutro( outro )
  {
    let quadrante = this.identificarQuadranteRelativoDoOutro( outro );
    switch( quadrante )
    {
      case 1:
        return this.radianoParaGrau(Math.asin(Math.abs(this.senoRelativoParaOutro(outro))));
      case 2:
        return Math.abs(this.radianoParaGrau(Math.asin(Math.abs(this.senoRelativoParaOutro(outro))))-90)+90
      case 3:
        return Math.abs(this.radianoParaGrau(Math.asin(Math.abs(this.senoRelativoParaOutro(outro)))))+180
      case 4:
        return Math.abs(this.radianoParaGrau(Math.asin(Math.abs(this.senoRelativoParaOutro(outro))))-360)
      default:
        return 0;
    }
  }

  /*correcaoDirecionalParaOutro( outro )
  {
    if ( outro.posicaoY < this.posicaoY )
    {
      return this.direcao( this, outro );
    }
    else if ( outro.posicaoY > this.posicaoY )
    {
      return this.direcao( this, outro ) + 180;
    }
  }*/

  acelerarArbritariamenteParaObjeto( aceleracaoArbitraria=0.01, outro )
  {
    if ( this.posicaoX < outro.posicaoX )
    {
      aceleracaoArbitraria = 0.01;
      this.aceleracaoX = aceleracaoArbitraria * this.cossenoRelativoParaOutro(outro);
      this.aceleracaoY = aceleracaoArbitraria * this.senoRelativoParaOutro(outro);
    }
    else
    {
      aceleracaoArbitraria = -0.01;
      this.aceleracaoX = aceleracaoArbitraria * this.cossenoRelativoParaOutro(outro);
      this.aceleracaoY = aceleracaoArbitraria * this.senoRelativoParaOutro(outro);
    }
  }

  //TODO: SEGREGATURO
  anguloInverso( angulo=0.0 )
  {
    if ( angulo <= 180 )
    {
      return angulo+180;
    }
    return angulo-180;
  }

  //TODO: SEGREGATURO
  obterNumeroAleatorioEntre( max, min )
  {
    return Math.floor( (Math.random() * (max - min + 1)) ) + min ;
  }

  radianoParaGrau( r )
  {
    return r*180/Math.PI;
  }

  //Agnóstico de objeto. SEGREGATURO ?
  direcao( a, b )
  {
    return Math.atan2( b.posicaoY-a.posicaoY, b.posicaoX-a.posicaoX )
    * 180/Math.PI;
  }

};

