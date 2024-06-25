function gravitacaoUniversal( CorpoA, CorpoB, distancia )
{
  const G = 0.00000000006674081;
  return G * ((CorpoA.massa * CorpoB.massa )/(distancia**distancia));
}

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
};

/** Direcionado pela velocidade */
class Corpo
{
  constructor( raio, px=undefined, py=undefined, vx, vy, ax, ay, m )
  {
    this.raio = raio;
    this.posicaoX = (typeof px == 'undefined')  ? obterNumeroAleatorioEntre(0,500) : px ;
    this.posicaoY =  (typeof py == 'undefined') ? obterNumeroAleatorioEntre(0,500) : py ;
    this.velocidadeX = vx;
    this.velocidadeY = vy;
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
  constructor( raio, px, py, vx, vy, massa )
  {
    this.raio = raio;
    this.velocidade = 0.1;
    this.angulo = new Angulo( 0.1 );
    this.posicaoX = px;
    this.posicaoY = py;
    this.velocidadex = vx;
    this.velocidadey = vy;
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

  aceleracaoGravitacionalParaOutroCorpo( outroCorpo )
  {
    console.log( this.anguloAteOutroCorpo( outroCorpo ), this.velocidade );
    this.angulo.definirNovoAngulo( this.anguloAteOutroCorpo( outroCorpo ) );
    if ( this.angulo.angulo > 0 && this.angulo.angulo < 90 ) this.velocidade = 0.1;
    else if ( this.angulo.angulo > 90 && this.angulo.angulo < 180 ) this.velocidade = -0.1;
    else if ( this.angulo.angulo > 180 && this.angulo.angulo < 270 ) this.velocidade = 0.1;
    else if ( this.angulo.angulo > 270 && this.angulo.angulo < 360 ) this.velocidade = -0.1;

  }

};

// lista de corpos físicos
let corpos = []; //dados dos corpos

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

// Gambiarra global
const opt = window.prompt( "1=controleManual 2=testeGravitacional", 0 );

/* Executa especificidades dos corposAlternativos */
function corposAlternativos( listaDeCorpos )
{

  for( i=0; i<listaDeCorpos.length; i++ )
  {
    if(
        typeof listaDeCorpos[i].lerEntradasPadronizadasParaUmaInstancia != 'undefined' &&
        typeof listaDeCorpos[i].aceleracaoGravitacionalParaOutroCorpo != 'undefined'
    )
    {
      switch( opt )
      {
        case '1':
          listaDeCorpos[0].lerEntradasPadronizadasParaUmaInstancia();
          break;
        case '2':
          listaDeCorpos[0].aceleracaoGravitacionalParaOutroCorpo( listaDeCorpos[1] );
          break;
      }
    }
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

    //essenciais
    renderizarCorpos( corpos, ctx );
    moverCorpos( corpos );

    //laterais
    corposAlternativos( corpos );

  }
  window.requestAnimationFrame( desenhar );
}
desenhar();


