
function distancia( objetoA, objetoB )
{
  return Math.sqrt( (objetoA.posicaoX - objetoB.posicaoX)**2 + (objetoA.posicaoY - objetoB.posicaoY)**2 );
}

function seno( objetoA, objetoB, hipotenusa=1 )
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

function correcaoQuadrante2( graus )
{
  if ( graus >= 90 || graus <= 180 )
    return Math.acos(Math.cos(graus))*180/Math.PI;
  return graus
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

let d, s, arcsen, arcos;
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

    o.posicaoX += o.velocidadeX;
    o.posicaoY += o.velocidadeY;
    o.velocidadeX += o.aceleracaoX;
    o.velocidadeY += o.aceleracaoY;
    o.aceleracaoX;
    o.aceleracaoY;

    d = distancia(o,planeta);
    s = seno(o,planeta,d);
    arcsen = (Math.asin(seno(o,planeta,distancia(o,planeta)))*180)/Math.PI;
    arcos = (Math.acos(Math.cos(arcsen))*180)/Math.PI;
    ctx.fillText(`${JSON.stringify(o)}`,10,10);
    ctx.fillText(`d=${d}`,10,20);
    ctx.fillText(`sen=${s}`,10,30);
    ctx.fillText(`arcsen=${arcsen}`,10,40);
    ctx.fillText(`arcos=${arcos}`,10,50);
    
  }
  window.requestAnimationFrame( desenhar );
}
desenhar();


