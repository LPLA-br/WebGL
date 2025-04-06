/*SIMPLES EXPERIMENTO DE QUEDA
 * Classe requer LiteralEntradasAcc correspondente para funcionar
 * */

import CorpoVertical from "./corpoVertical";
import RenderizadorCanvas from "./renderizadorCanvas";
import Tempo from "./tempo";

// um píxel é um cm
// um metro equivale a 100 pixeles
const METRO = 100;

//gambiarra com object literal
const LiteralEntradasAcc =
{
  iniciar: document.querySelector( "#inicio" ),
  aceleracao1: document.querySelector( "#aceleracao1" ),
  aceleracao2: document.querySelector( "#aceleracao2" ),
  atraso: document.querySelector("#atraso"),
};

class RenderizadorCanvasAcc extends RenderizadorCanvas
{
  iniciarAmbienteDeObjetos()
  {
    this.adicionarObjeto(  new CorpoVertical( 10, 250, 100, 0, 0 ) );
    this.adicionarObjeto(  new CorpoVertical( 10, 750, 100, 0, 0 )  );

    this.literalEntradas.iniciar.addEventListener( 'click', ()=>
    {
      this.objetos[0].redefinir( 100, (+this.literalEntradas.aceleracao1.value) );
      this.objetos[1].redefinir( 100, (+this.literalEntradas.aceleracao2.value) );
    });
  }

  desenhar()
  {
    if ( this.canvas.getContext )
    {
      this.fundoPreto();

      this.context.fillStyle = "#00FF00"
      this.context.fillRect( 0, 900, 1000, 10 );
      this.renderizarRegua( this.context );

      this.context.fillStyle = "#FFFFFF"; //cor das proximas renderizações.

      this.renderizarCorpos();
      if ( this.literalEntradas.atraso.checked )
      {
        //new Tempo().atrasar( 1 ); //obsoleto
      }
      this.atualizarRenderizaçãoPosicionalObjetos();
    }
  }

  // --- superconjunto ---

  //private
  renderizarCorpos()
  {
    for( let i=0; i<this.objetos.length; i++ )
    {
      const representacao = new Path2D();
      representacao.arc(
        this.objetos[i].posicaoX,
        this.objetos[i].posicaoY,
        this.objetos[i].raio,
        0,
        (2 * Math.PI)
      );
      this.context.fill( representacao );
    }
  }

  //private
  atualizarRenderizaçãoPosicionalObjetos()
  {
    for( let i=0; i<this.objetos.length; i++ )
    {
      this.objetos[i].moverSe();
      this.objetos[i].acelerar();
      this.objetos[i].impactar( 900 );
    }
  }

  //private
  renderizarRegua()
  {
    let py = METRO;
    while( py < 900 )
    {
      this.context.fillStyle = "#00FF00";
      this.context.fillRect( 10, py, 1000, 1 );
      py += METRO;
    }
  }

};

export { RenderizadorCanvasAcc, LiteralEntradasAcc };
