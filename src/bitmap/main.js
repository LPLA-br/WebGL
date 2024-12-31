import * as ImgAvalia from "./ImgAvalia";
import Mars8b from "../public/Mars8b.bmp?raw"
import mars from "../public/mars.pgm?raw"

const canvas = document.getElementById("superficie");

const utf8Encode = new TextEncoder();
const imagemBytes = utf8Encode.encode(Mars8b);
const imagemBytes2 = utf8Encode.encode(mars);
console.log(imagemBytes2)

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

let altura = 1024;
let largura = 512;
let profundidade = 1;
const alturaEle = document.querySelector("#altura");
const larguraEle = document.querySelector("#largura");
const profundidadeEle = document.querySelector("#profundidade");
alturaEle.addEventListener("click", ()=>{ altura=alturaEle.value });
larguraEle.addEventListener("click", ()=>{ largura=larguraEle.value });
profundidadeEle.addEventListener("click", ()=>{ profundidade=profundidadeEle.value });
 
let contador = 0;
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
    if ( contador == 0 )
    {
      //ImgAvalia.reproduzirSequenciaBytesEmCanvasProfundidade( imagemBytes, 2, profundidade, ctx, largura, altura, 0x37 );
      ImgAvalia.reproduzirSequenciaBytesEmCanvasProfundidade( imagemBytes2, 10, 1, ctx, 45, 49, 0x09 );
      contador = (1*10**3);
    }
    contador--;
    /*BMP*/
  }
  window.requestAnimationFrame( desenhar );
}
desenhar();

