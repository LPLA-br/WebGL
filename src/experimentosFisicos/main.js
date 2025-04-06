/* CARREGAMENTO DINÂMICO DOS EXPERIMENTOS - PÓS REFATORAÇAÕ*/
import RenderizadorCanvas from "./renderizadorCanvas";

const SELETOR_GLOBAL = document.querySelector("seletor_global");

let objetoCorrente = null;

switch( SELETOR_GLOBAL )
{
  case "A":
    break;
  case "B":
    break;
  case "C":
    break;
  default:
    alert("não seleção");
    objetoCorrente = new RenderizadorCanvas( "#quedaSuperficie" );
    objetoCorrente.fundoPreto();
    break;
}
