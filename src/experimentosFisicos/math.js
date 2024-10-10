
const canvas = document.getElementById("superficie");

/** Retorna posição y computando com x
 * @param {true|false} - inversão
 * @param {number} x - inteiro entre -x e |-x|
 * @param {number} r coeficiente > 0
 * */
function semiCirculo( x, inversao=false, r )
{
  if ( inversao === false )
    return Math.sqrt(  Math.abs(r**2 - x**2) );
  else
    return -Math.sqrt(  r**2 - x**2 );
}

/*
 * Duas variáveis e três coeficientes
 * h,v - centro do círculo
 * x,y - posição variável ...
 * r - raio
 * */
function circulo( h=2, k=2, x, y, r=1 )
{
  ( x - h )**2 + ( y - k )**2;
  r**2;
}

let x = 1;
let init = true;

setInterval( ()=>{
  x = (x<300) ? (x += 0.5) : (x)
}, 10 );

function desenhar()
{
  if (canvas.getContext)
  {
    const ctx = canvas.getContext("2d");
    //ctx.clearRect(0, 0, canvas.width, canvas.height );
    if ( init )
    {
      ctx.fillStyle = "#000000";
      ctx.fillRect( 0, 0, canvas.width, canvas.height );
      init = false;
    }
    ctx.clearRect(500,500,10,10);
   
    //PROGRAM
    ctx.fillStyle = "#ffffff";
    ctx.clearRect( x, semiCirculo(x,false,100), 2, 2 );
  }
  window.requestAnimationFrame( desenhar );
}
desenhar();
