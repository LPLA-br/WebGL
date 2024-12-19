import * as ImgAvalia from "./ImgAvalia";
import Mars8b from "../public/Mars8b.bmp?raw"
import mars from "../public/mars.bmp?raw"

const canvas = document.getElementById("superficie");

const utf8Encode = new TextEncoder();
const imagemBytes = utf8Encode.encode(Mars8b);
const imagemBytes2 = utf8Encode.encode(mars);

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

let exec = true;
let altura = 1024;
let largura = 512;
let profundidade = 1;
const reload = document.querySelector("#reload");
const alturaEle = document.querySelector("#altura");
const larguraEle = document.querySelector("#largura");
const profundidadeEle = document.querySelector("#profundidade");
reload.addEventListener("click", ()=>{});
alturaEle.addEventListener("click", ()=>{ altura=alturaEle.value });
larguraEle.addEventListener("click", ()=>{ largura=larguraEle.value });
profundidadeEle.addEventListener("click", ()=>{ profundidade=profundidadeEle.value });

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
    if ( exec )
    {
      ImgAvalia.reproduzirSequenciaBytesEmCanvasProfundidade( imagemBytes, 1, profundidade,ctx, largura, altura, 0x37 );
      exec=false
    }
    /*BMP*/
  }
  window.requestAnimationFrame( desenhar );
}
desenhar();

