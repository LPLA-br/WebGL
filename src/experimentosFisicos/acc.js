
const METRO = 100; // 1 m/s² = (100 unidades)/s²

class Corpo
{
  constructor( raio, px=100, py=100, vy=0, ay )
  {
    this.raio = raio;
    this.posicaoY = py;
    this.posicaoX = px;
    this.velocidadeY = vy;
    this.aceleracaoY = ay;
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


let corpos = [ new Corpo( 10, 250, 100, 0, 0 ), new Corpo( 10, 750, 100, 0, 0 ) ];

iniciar.addEventListener( 'click', ()=>
{
  corpos[0].redefinir( 100, (+aceleracao1.value) );
  corpos[1].redefinir( 100, (+aceleracao2.value) );
});

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
    listaDeCorpos[i].moverSe();
    listaDeCorpos[i].acelerar();
    listaDeCorpos[i].impactar( 900 );
  }
}

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

//setInterval( ()=>{ moverCorpos( corpos ); console.log('t') }, 1000 );

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
    moverCorpos( corpos );
  }
  window.requestAnimationFrame( desenhar );
}
desenhar();

