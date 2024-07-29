

// um píxel é um cm
// um metro equivale a 100 pixeles
const METRO = 100;

// 1m/s² = (100)/s²

class Corpo
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

};

const canvas = document.querySelector("#superficie");
const iniciar = document.querySelector( "#inicio" );
const aceleracao1 = document.querySelector( "#aceleracao1" );
const aceleracao2 = document.querySelector( "#aceleracao2" );
const atraso = document.querySelector("#atraso");

let corpos = [ new Corpo( 10, 250, 100, 0, 0 ), new Corpo( 10, 750, 100, 0, 0 ) ];

iniciar.addEventListener( 'click', ()=>
{
  corpos[0].redefinir( 100, (+aceleracao1.value) );
  corpos[1].redefinir( 100, (+aceleracao2.value) );
});

// ArrayOf[Corpo] -> canvas.context -> void
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

// ArrayOf[Corpo] -> void
function moverCorpos( listaDeCorpos )
{
  for( i=0; i<listaDeCorpos.length; i++ )
  {
    listaDeCorpos[i].moverSe();
    listaDeCorpos[i].acelerar();
    listaDeCorpos[i].impactar( 900 );
  }
}

// canvas.context -> void
function Regua( ctx )
{
  let py = METRO;
  while( py < 900 )
  {
    ctx.fillStyle = "#00FF00";
    ctx.fillRect( 10, py, 1000, 1 );
    py += METRO;
  }
}

// string -> number
function formatarTimestampSegundos( timestamp )
{
  return +timestamp.toString().slice(0,10);
}

// number -> void
function atrasar( segundos )
{
  let tempoFinal = (formatarTimestampSegundos( new Date().getTime() ) + segundos);
  while( true )
  {
    if ( formatarTimestampSegundos((new Date().getTime())) > tempoFinal ) break;
  }
}

function desenhar()
{
  if (canvas.getContext)
  {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000"; //fundo
    ctx.clearRect(0, 0, canvas.width, canvas.height );
    ctx.fillRect( 0, 0, 1000, 1000 );

    ctx.fillStyle = "#00FF00"
    ctx.fillRect( 0, 900, 1000, 10 );
    Regua( ctx );

    ctx.fillStyle = "#FFFFFF"; //cor das proximas renderizações.

    //essenciais
    renderizarCorpos( corpos, ctx );
    if ( atraso.checked ) atrasar( 1 );
    moverCorpos( corpos );
  }
  window.requestAnimationFrame( desenhar );
}
desenhar();

