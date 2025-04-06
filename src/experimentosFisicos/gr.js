/*DEMONSTRA A CAPACIDADE DE ORIENTAR O
 *MOVIMENTO DE UM CORPO PELO VALOR DE ÂNGULO */

import RenderizadorCanvas from "./renderizadorCanvas";
import Corpo from "./corpo";
import CorpoAlternativo from "./corpoAlternativo";

const LiteralEntradasGr =
{
  velocidade: document.querySelector("#velocidade"),
  angulo: document.querySelector("#angulo")
}

class RenderizadorCanvasGr extends RenderizadorCanvas
{
  iniciarAmbienteDeObjetos()
  {
    //TODO: refatorar POG
    this.objetos.push(  new CorpoAlternativo( 10,100,200,0,0, 10)  );
    this.objetos.push(  new Corpo( 10, 200, 200, 0, 0, 0, 0, 9000000000 ) );
  }

  desenhar()
  {
    if (this.canvas.getContext)
    {
      this.fundoPreto();

      this.context.fillStyle = "#FFFFFF"; //cor das proximas renderizações.

      this.renderizarCorpos();
      this.atualizarRenderizaçãoPosicionalObjetos();

      //TODO: refatorar POG
      this.objetos[0].lerEntradasPadronizadasParaUmaInstancia( this.literalEntradas.velocidade, this.literalEntradas.angulo );
    }
  }

  //---- superconjunto ----

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

  atualizarRenderizaçãoPosicionalObjetos()
  {
    for( let i=0; i<this.objetos.length; i++ )
    {
      this.objetos[i].moverSe();
    }
  }
};

export { RenderizadorCanvasGr, LiteralEntradasGr };

