/*DEMONSTRA A CAPACIDADE DE ORIENTAR O
 *MOVIMENTO DE UM CORPO PELO VALOR DE ÂNGULO */

function obterNumeroAleatorioEntre( max, min )
{
  return Math.floor( (Math.random() * (max - min + 1)) ) + min ;
}

/*estrutura para ângulos*/
class Angulo
{
  constructor( angulo )
  {
    this.angulo = (angulo > 360 || angulo < 0) ? (45) : (angulo) ;
  }

  grausParaRadianos()
  {
    return (this.angulo*(Math.PI/180));
  }

    definirNovoAngulo( graus )
    {
      this.angulo = (graus > 360 || graus < 0) ? (this.angulo) : (graus) ;
    }

    incrementarAngulo()
    {
      this.angulo = ((this.angulo + 1) > 360) ? (0) : (this.angulo+1) ;
    }

    decrementarAngulo()
    {
      this.angulo = ((this.angulo - 1) < 0) ? (360) : (this.angulo-1) ;
    }

    /** retorna uma lista com 360 números de ângulo.
     *  inicioOutro - ângulo zero deste corresponde a angulo X daquele.
     *  outroInvertido - outro gira em direção contraria à minha.
     * */
    mapearCirculoAngularParaOutroDiferente( inicioOutro=0, outroInvertido=false )
    {
      let mapa = [];
      let circuloB = inicioOutro;

      for( let circuloA = 0; circuloA <= 360; circuloA++ )
      {
        if ( circuloB > 360 ) circuloB = 0;
        if ( circuloB < 0 ) circuloB = 360;

        if ( circuloB != -1 ) mapa.push( circuloB );

        if ( outroInvertido == true ) circuloB--;
        else circuloB++;
      }
      while( mapa.length > 360 ) mapa.pop();
      return mapa;
    }


  };

  /** Direcionado pela velocidade */
class Corpo
{
  constructor( raio, posicaoX=undefined, posicaoY=undefined, velocidadeX, velocidadeY, ax, ay, m )
  {
    this.raio = raio;
    this.posicaoX = (typeof posicaoX == 'undefined')  ? obterNumeroAleatorioEntre(0,500) : posicaoX ;
    this.posicaoY =  (typeof posicaoY == 'undefined') ? obterNumeroAleatorioEntre(0,500) : posicaoY ;
    this.velocidadeX = velocidadeX;
    this.velocidadeY = velocidadeY;
    this.aceleracaoX = ax;
    this.aceleracaoY = ay;
    this.massa = m;
  }

  seMover()
  {
    this.posicaoX += this.velocidadeX;
    this.posicaoY += this.velocidadeY;
  }

  mutarVelocidadePelaAceleracao()
  {
    this.velocidadeX += this.aceleracaoX;
    this.velocidadeY += this.aceleracaoY;
  }

};

/* Observações interessantes:
 * CorpoAlternativo é um conjunto de métodos e atributos interseccionante com Corpo.
 * Ele pode ser empregado sem modificações no método renderizador!
 * A Herança não é através de extenção, mas sim por interface inplicita.
 * seMover() é polimorfico {difere no algorítmo} */

/** direcionado por ângulo */
class CorpoAlternativo
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

  seMover()
  {
    let rad = this.angulo.grausParaRadianos(); 
    this.velocidadex = this.velocidade * Math.cos( rad );
    this.velocidadey = this.velocidade * Math.sin( rad );
    this.posicaoX += this.velocidadex;
    this.posicaoY += this.velocidadey;
  }

  lerEntradasPadronizadasParaUmaInstancia()
  {
    const velocidade = document.getElementById('velocidade'); 
    const direcao = document.getElementById('angulo'); 
    this.velocidade = +velocidade.value;
    this.angulo.definirNovoAngulo( +direcao.value );
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

  // método descartado.
  aceleracaoGravitacionalParaOutroCorpo( outroCorpo )
  {
    const mapa = this.angulo.mapearCirculoAngularParaOutroDiferente();
    console.log( mapa[Math.trunc(this.anguloAteOutroCorpo( outroCorpo ))] );
    this.angulo.definirNovoAngulo( mapa[Math.trunc(this.anguloAteOutroCorpo( outroCorpo ))] );
  }

};

// LISTA DE CORPOS FÍSICOS
let corpos = [];

corpos.push( new CorpoAlternativo( 10,100,200,0,0, 10) );
corpos.push( new Corpo( 10, 200, 200, 0, 0, 0, 0, 9000000000 ) );

const canvas = document.getElementById("superficie");

// desenha todos os objetos salvos em corpos.
function renderizarCorpos( listaDeCorpos, contexto )
{
  for( i=0; i<listaDeCorpos.length; i++ )
  {
    const representacao = new Path2D();
    representacao.arc(
      listaDeCorpos[i].posicaoX,
      listaDeCorpos[i].posicaoY,
      listaDeCorpos[i].raio,
      0,
      (2 * Math.PI)
    );
    contexto.fill( representacao );
  }
}

function moverCorpos( listaDeCorpos )
{
  for( i=0; i<listaDeCorpos.length; i++ )
  {
    listaDeCorpos[i].seMover();
  }
}

//função principal
function desenhar()
{
  if (canvas.getContext)
  {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000"; //fundo
    ctx.clearRect(0, 0, canvas.width, canvas.height );
    ctx.fillRect( 0, 0, 1000, 1000 );

    ctx.fillStyle = "#FFFFFF"; //cor das proximas renderizações.

    renderizarCorpos( corpos, ctx );
    moverCorpos( corpos );

    corpos[0].lerEntradasPadronizadasParaUmaInstancia();

  }
  window.requestAnimationFrame( desenhar );
}
desenhar();

export { Angulo };

