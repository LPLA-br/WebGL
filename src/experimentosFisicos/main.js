/* CARREGAMENTO DINÂMICO DOS EXPERIMENTOS - PÓS REFATORAÇAÕ*/
import RenderizadorCanvas from "./classes/renderizadorCanvas";

// Conjunto classe renderizadora e entradas HTML por experimento
import { RenderizadorCanvasAcc, LiteralEntradasAcc} from "./acc";
import { RenderizadorCanvasGr, LiteralEntradasGr } from "./gr";
import { RenderizadorCanvasVa, LiteralEntradasVa } from "./va";

const SELETOR_GLOBAL = document.querySelector(".seletor_global");

let objetoCorrente = new RenderizadorCanvas( "#quedaSuperficie", {});
let intervalCorrente = 0;

async function mudarContexto( letraMaiusculaSeletora )
{
  console.log( letraMaiusculaSeletora );
  switch( letraMaiusculaSeletora )
  {
    case 'Z':
      objetoCorrente = null;
      clearInterval( intervalCorrente );
      break;
    case 'A':
      objetoCorrente = new RenderizadorCanvasVa("#gravidadeSuperficie", LiteralEntradasVa );
      objetoCorrente.iniciarAmbienteDeObjetos();
      clearInterval( intervalCorrente );
      intervalCorrente = setInterval( ()=>{
        objetoCorrente.desenhar();
      }, 1);
      break;
    case 'B':
      objetoCorrente = new RenderizadorCanvasGr("#anguloSuperficie", LiteralEntradasGr );
      objetoCorrente.iniciarAmbienteDeObjetos();
      clearInterval( intervalCorrente );
      intervalCorrente = setInterval( ()=>{
        objetoCorrente.desenhar();
      }, 1);
      break;
    case 'C':
      objetoCorrente = new RenderizadorCanvasAcc("#quedaSuperficie", LiteralEntradasAcc );
      objetoCorrente.iniciarAmbienteDeObjetos();
      //Alternativa a window.requestAnimationFrame() não funcional
      clearInterval( intervalCorrente );
      intervalCorrente = setInterval( ()=>{
        objetoCorrente.desenhar();
      }, 100);
      break;
    default:
  }
}

SELETOR_GLOBAL.addEventListener( "change", ()=>
{
  SELETOR_GLOBAL.childNodes.forEach( (elemento)=>
  {
    if(elemento.type !== undefined)
    {
      if( elemento.type == "radio" && elemento.checked )
      {
        console.log( "Alterando contexto para: " + elemento.value );
        mudarContexto( elemento.value );
      }
    }
  });
});
