// controle de aceleração.

//velocidade constante
function velocidadeXY( posicaoXY, velocidade, aceleracao )
{
  return (posicaoXY + velocidade) + aceleracao;
}

function alterarAceleracao( aceleracao, taxa )
{
  return aceleracao + taxa;
}

const o =
{
  altura: 10,
  largura: 10,
  posicaoX: 0,
  posicaoY: 500,
  velocidadeX: 0,
  velocidadeY: 0,
  aceleracaoX: 0,
  aceleracaoY: 0
};
let valor = 1;


const canvas = document.getElementById("superficie");
const aceleY = document.getElementById("aceleY");
const aceleX = document.getElementById("aceleX");

//controle do quadrado por wasd
document.addEventListener("keydown", aoBaixarDeUmaTecla, false);
async function aoBaixarDeUmaTecla( event ) 
{
  let keyCode = event.which;

  if (keyCode == 87) //w
  {
    o.aceleracaoY += 0.1;
  }
  else if (keyCode == 83) //s
  {
    o.aceleracaoY -= 0.1;
  }
  else if (keyCode == 68 ) //d
  {
    o.aceleracaoX -= 0.1;
  }
  else if (keyCode == 65 ) //a
  {
    o.aceleracaoX += 0.1;
  }
};

//loop
function desenhar()
{
  if (canvas.getContext)
  {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0000FF";
    ctx.fillRect( o.posicaoX, o.posicaoY, o.altura, o.largura);

    o.posicaoX = velocidadeXY( o.posicaoX, o.velocidadeX, o.aceleracaoX );
    o.posicaoY = velocidadeXY( o.posicaoY, o.velocidadeY, o.aceleracaoY );

    o.aceleracaoX = alterarAceleracao( o.aceleracaoX, Number.parseFloat(aceleX.value) );
    o.aceleracaoY = alterarAceleracao( o.aceleracaoY, Number.parseFloat(aceleY.value) );

    ctx.fillText(`${JSON.stringify(o)}`,10,10);
    
  }
  window.requestAnimationFrame( desenhar );
}
desenhar();


