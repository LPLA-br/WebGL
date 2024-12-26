
function radianoParaGrau( radiano )
{
  return (radiano*180)/Math.PI;
}

function grauParaRadiano( grau )
{
  return grau*(Math.PI/180);
}

function distancia( objetoA, objetoB )
{
  return Math.sqrt( (objetoA.posicaoX - objetoB.posicaoX)**2 + (objetoA.posicaoY - objetoB.posicaoY)**2 );
}

//computa senoRelativo relativo a outro objeto
function senoRelativo( objetoA, objetoB, hipotenusa=1 )
{
  let oposto = 0;

  if ( objetoA.posicaoY > objetoB.posicaoY )
  {
    oposto = objetoA.posicaoY - objetoB.posicaoY;
  }
  else
  {
    oposto = objetoB.posicaoY - objetoA.posicaoY;
  }
  return oposto/hipotenusa;
}

function cossenoRelativo( objetoA, objetoB, hipotenusa=1  )
{
  let adjacente = 0;

  if ( objetoA.posicaoX > objetoB.posicaoX )
  {
    adjacente = objetoA.posicaoX - objetoB.posicaoX;
  }
  else
  {
    adjacente = objetoB.posicaoX - objetoA.posicaoX;
  }

  return adjacente/hipotenusa;
}

//Identifica quatrante relativo
function quadranteRelativo( objetoA, objetoB )
{
  if ( objetoA.posicaoX > objetoB.posicaoX && objetoA.posicaoY > objetoB.posicaoY )
  {
    return 4;
  }
  else if ( objetoA.posicaoX < objetoB.posicaoX && objetoA.posicaoY > objetoB.posicaoY )
  {
    return 3;
  }
  else if ( objetoA.posicaoX < objetoB.posicaoX && objetoA.posicaoY < objetoB.posicaoY )
  {
    return 2;
  }
  else if ( objetoA.posicaoX > objetoB.posicaoX && objetoA.posicaoY < objetoB.posicaoY   )
  {
    return 1;
  }
  return 1;
}

//possibilita obter ângulo verso e reverso.
function anguloInverso( angulo )
{
  if ( angulo <= 180 )
  {
    return angulo+180;
  }
  return angulo-180;
}

//aplica correção de ângulo por quadrante relativo ! DE A PARA OBJETO B (alvo) !
function correcao( objetoA, objetoB, d, quadrante )
{
  switch( quadrante )
  {
    case 1:
      return radianoParaGrau(Math.asin(Math.abs(senoRelativo(objetoA,objetoB,d))));
    case 2:
      return Math.abs(radianoParaGrau(Math.asin(Math.abs(senoRelativo(objetoA,objetoB,d))))-90)+90
    case 3:
      return Math.abs(radianoParaGrau(Math.asin(Math.abs(senoRelativo(objetoA,objetoB,d)))))+180
    case 4:
      return Math.abs(radianoParaGrau(Math.asin(Math.abs(senoRelativo(objetoA,objetoB,d)))))-360
    default:
      return 0;
  }
}

class Corpo
{
  constructor( alt, lar, px, py, vx, vy, ax, ay, m )
  {
    this.altura = alt;
    this.largura = lar;
    this.posicaoX = px;
    this.posicaoY =  py;
    this.velocidadeX = vx;
    this.velocidadeY = vy;
    this.aceleracaoX = ax;
    this.aceleracaoY = ay;
    this.massa = m;
  }
}

class CorpoEsferico extends Corpo
{
  constructor( raio, px, py, vx, vy, ax, ay, m )
  {
    super( 0, 0, px, py, vx, vy, ax, ay, m );
    this.raio = raio;
  }
}

let corpos = [];
corpos.push();

const o = new CorpoEsferico( 5, 0, 500, 0, 0, 0, 0, 10 );
const planeta = new CorpoEsferico( 10, 500, 500, 0, 0, 0, 0, 1000000000 );

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
    o.aceleracaoY -= 0.01;
  }
  else if (keyCode == 83) //s
  {
    o.aceleracaoY += 0.01;
  }
  else if (keyCode == 68 ) //d
  {
    o.aceleracaoX += 0.01;
  }
  else if (keyCode == 65 ) //a
  {
    o.aceleracaoX -= 0.01;
  }
  else if ( keyCode == 81 ) //q
  {
    o.velocidadeX = 0;
    o.velocidadeY = 0;
    o.aceleracaoX = 0;
    o.aceleracaoY = 0;
  }
};

let d, s, c;
function desenhar()
{
  if (canvas.getContext)
  {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect( 0, 0, 1000, 1000 );

    ctx.fillStyle = "#FFFFFF";

    const nave = new Path2D();
    nave.arc( o.posicaoX, o.posicaoY, o.raio, 0, 2 * Math.PI);
    ctx.fill( nave );

    const circle = new Path2D();
    circle.arc( planeta.posicaoX, planeta.posicaoY, planeta.raio, 0, 2 * Math.PI);
    ctx.fill( circle );

    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo( o.posicaoX, o.posicaoY );
    ctx.lineTo( o.posicaoX+o.velocidadeX*8, o.posicaoY+o.velocidadeY*8 );
    ctx.stroke();

    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo( o.posicaoX, o.posicaoY );
    ctx.lineTo( planeta.posicaoX, planeta.posicaoY );
    ctx.stroke();

    o.posicaoX += o.velocidadeX;
    o.posicaoY += o.velocidadeY;
    o.velocidadeX += o.aceleracaoX;
    o.velocidadeY += o.aceleracaoY;
    o.aceleracaoX;
    o.aceleracaoY;

    d = distancia(o,planeta);
    s = senoRelativo(o,planeta,d);
    c = cossenoRelativo(o,planeta,d);
    ctx.fillText(`${JSON.stringify(o)}`,10,10);
    ctx.fillText(`d=${d}`,10,20);
    ctx.fillText(`rel_sen=${s}`,10,30);
    ctx.fillText(`rel_cos=${c}`,10,40);
    ctx.fillText(`grau_B_ate_A=${correcao(o,planeta,d,quadranteRelativo(o,planeta))}`,10,50);
    ctx.fillText(`grau_A_ate_B=${anguloInverso(correcao(o,planeta,d,quadranteRelativo(o,planeta)))}`,10,60);

    
  }
  window.requestAnimationFrame( desenhar );
}
desenhar();


