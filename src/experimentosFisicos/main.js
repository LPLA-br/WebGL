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
      const deltaTempo = 1.0;
      objetoCorrente = new RenderizadorCanvasVa("#gravidadeSuperficie", LiteralEntradasVa, deltaTempo );
      objetoCorrente.iniciarAmbienteDeObjetos();
      removeEventListener( "keydown", vaControlador );
      document.addEventListener("keydown", vaControlador, false);
      clearInterval( intervalCorrente );
      intervalCorrente = setInterval( ()=>{
        objetoCorrente.desenhar();
      }, deltaTempo );
      break;
    case 'B':
      objetoCorrente = new RenderizadorCanvasGr("#anguloSuperficie", LiteralEntradasGr );
      objetoCorrente.iniciarAmbienteDeObjetos();
      clearInterval( intervalCorrente );
      removeEventListener( "keydown", vaControlador );
      intervalCorrente = setInterval( ()=>{
        objetoCorrente.desenhar();
      }, 1);
      break;
    case 'C':
      objetoCorrente = new RenderizadorCanvasAcc("#quedaSuperficie", LiteralEntradasAcc );
      objetoCorrente.iniciarAmbienteDeObjetos();
      //Alternativa a window.requestAnimationFrame() não funcional
      clearInterval( intervalCorrente );
      removeEventListener( "keydown", vaControlador );
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

// SETOR DE GAMBIARRAS GLOBAIS
function vaControlador( event ) 
{
  let keyCode = event.which;

  if (keyCode == 87) //w
  {
    objetoCorrente.getObjetoControlavel().aceleracaoY -= 0.01;
  }
  else if (keyCode == 83) //s
  {
    objetoCorrente.getObjetoControlavel().aceleracaoY += 0.01;
  }
  else if (keyCode == 68 ) //d
  {
    objetoCorrente.getObjetoControlavel().aceleracaoX += 0.01;
  }
  else if (keyCode == 65 ) //a
  {
    objetoCorrente.getObjetoControlavel().aceleracaoX -= 0.01;
  }
  else if ( keyCode == 81 ) //q
  {
    objetoCorrente.getObjetoControlavel().velocidadeX = 0;
    objetoCorrente.getObjetoControlavel().velocidadeY = 0;
    objetoCorrente.getObjetoControlavel().aceleracaoX = 0;
    objetoCorrente.getObjetoControlavel().aceleracaoY = 0;

    //integração verlet
    objetoCorrente.getObjetoControlavel().posicaoXAnterior = 0;
    objetoCorrente.getObjetoControlavel().posicaoYAnterior = 0;
    objetoCorrente.getObjetoControlavel().posicaoAnterior.x = 0;
    objetoCorrente.getObjetoControlavel().posicaoAnterior.y = 0;
  }
  else if ( keyCode = 86 )
  {
    objetoCorrente.getObjetoControlavel().velocidadeX = +LiteralEntradasVa.velocX.value;
    objetoCorrente.getObjetoControlavel().velocidadeY = +LiteralEntradasVa.velocY.value;
  }
  else if ( keyCode = 67 )
  {
    //No Operation
  }
};
