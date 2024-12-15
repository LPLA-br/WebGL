import * as ImgAvalia from "./ImgAvalia";
import Mars8b from "../public/Demo10x10x8.bmp?raw"

const canvas = document.getElementById("superficie");

const utf8Encode = new TextEncoder();
const imagemBytes = utf8Encode.encode(Mars8b);
const imgDados = ImgAvalia.extrairPixelesParaMatrizDeMatrizesComBytesIndependente( imagemBytes, 10, 10 );

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

function quadratica( a=1, b, c, x )
{
  return a*x**2 + b*x + c;
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
    //ctx.clearRect(500,500,10,10);
   
    /* MATH */
    //ctx.fillStyle = "#ffffff";
    //ctx.clearRect( x, semiCirculo(x,false,100), 2, 2 );
    /* MATH */

    /*BMP*/
    ImgAvalia.reproduzirSequenciaBytesEmCanvas( imagemBytes, 10, ctx, 10, 10, 37 );
    /*BMP*/
  }
  window.requestAnimationFrame( desenhar );
}
desenhar();
