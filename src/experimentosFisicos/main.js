/* CARREGAMENTO DINÂMICO DOS EXPERIMENTOS - PÓS REFATORAÇAÕ*/
import RenderizadorCanvas from "./renderizadorCanvas";

import { RenderizadorCanvasAcc, LiteralEntradasAcc} from "./acc";
import { RenderizadorCanvasGr, LiteralEntradasGr } from "./gr";

const SELETOR_GLOBAL = document.querySelector(".seletor_global");

let objetoCorrente = new RenderizadorCanvas( "#quedaSuperficie", {});

async function mudarContexto( letraMaiusculaSeletora )
{
  console.log( letraMaiusculaSeletora );
  switch( letraMaiusculaSeletora )
  {
    case 'A':
      objetoCorrente = undefined;
      break;
    case 'B':
      objetoCorrente = new RenderizadorCanvasGr("#anguloSuperficie", LiteralEntradasGr );
      objetoCorrente.iniciarAmbienteDeObjetos();
      setInterval( ()=>{
        objetoCorrente.desenhar();
      }, 100);
      break;
    case 'C':
      objetoCorrente = new RenderizadorCanvasAcc("#quedaSuperficie", LiteralEntradasAcc );
      objetoCorrente.iniciarAmbienteDeObjetos();
      //Alternativa a window.requestAnimationFrame() não funcional
      setInterval( ()=>{
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
