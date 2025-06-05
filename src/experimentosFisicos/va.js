/* EXPERIMENTOS EVOLUTIVOS PARA SIMULAÇÃO GRAVITACIONAL */

import RenderizadorCanvas from "./classes/renderizadorCanvas";
import CirculoDinamicoIdentificado from "./classes/circuloDinamicoIdentificado";
import CirculoDinamicoIdentificadoIntegravel from "./classes/circuloDinamicoIdentificadoIntegravel";
import { Gravidade } from "./classes/fisica";

const LiteralEntradasVa = 
{
  canvas:document.getElementById("gravidadeSuperficie"),
  velocX:document.getElementById("velocidadeY"),
  velocY:document.getElementById("velocidadeX"),
  gravit:document.getElementById("gravitSwitch")
};

// TODO: mitigar problema das strings mágicas e dos efêmeros notáveis
class RenderizadorCanvasVa extends RenderizadorCanvas
{
  constructor( canvasId="", literalEntradas={}, deltaTempo )
  {
    super(canvasId,literalEntradas);
    this.deltaTempo = deltaTempo;
  }

  iniciarAmbienteDeObjetos()
  {
    /*STRINGS MÁGICAS E POSIÇÕES MÁGICAS*/
    this.objetos.push(new CirculoDinamicoIdentificadoIntegravel( 5, 700, 200, 0, 0, 0, 0, 1, "movel", this.deltaTempo));
    this.objetos.push(new CirculoDinamicoIdentificado( 10, 500, 500, 0, 0, 0, 0, 2, "fixo" ));
  }

  desenhar()
  {
    if (this.canvas.getContext)
    {
      this.context = this.canvas.getContext("2d");
      this.fundoPreto();
      this.context.fillStyle = "#FFFFFF";
      this.renderizarCorpos();
      this.renderizarVetorParaAlvo( "movel", "red", 16 );
      this.renderizarInformacoes();
      this.atualizarRenderizaçãoPosicionalObjetos();
    }
  }

  // ----- superconjunto -----

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
    // abaixo ativado por checkbox
    this.objetos.forEach( objeto =>
    {
      if ( objeto.identificador == "movel" && this.literalEntradas.gravit.checked )
      {
        let aceleracao = new Gravidade(1, this.objetos[0], this.objetos[1] ).forcaGravitacionalDoisCorpos();
        objeto.acelerarArbritariamenteParaObjeto( aceleracao, this.objetos[1]);
      }
    });

    for ( let i=0; i<this.objetos.length; i++ )
    {
      this.objetos[i].moverSe();
      this.objetos[i].acelerar();
    }
  }

  //private
  // Renderiza vetor principal resultante
  renderizarVetorParaAlvo( identificador="", cor="red", multiplicador=8 )
  {
    let referenciaObjeto = undefined;
    for ( let i=0; i<this.objetos.length; i++ )
    {
      if ( this.objetos[i].identificador == identificador )
      {
        referenciaObjeto = this.objetos[i];
        break;
      }
    }

    if ( typeof referenciaObjeto == 'object' )
    {
      this.context.strokeStyle = cor;
      this.context.beginPath();
      this.context.moveTo( referenciaObjeto.posicaoX, referenciaObjeto.posicaoY );
      this.context.lineTo( 
        referenciaObjeto.posicaoX + referenciaObjeto.velocidadeX*multiplicador,
        referenciaObjeto.posicaoY + referenciaObjeto.velocidadeY*multiplicador
      );
      this.context.stroke();
    }
    else
    {
      console.error( "referenciaObjeto indefinido" );
    }
  }

  //private
  renderizarInformacoes()
  {
    let objetoMovel = this.objetos[0];
    let objetoEstatico = this.objetos[1];

    if ( objetoMovel !== undefined && objetoEstatico !== undefined )
    {
      this.context.fillText(`A=${JSON.stringify( objetoMovel )}`,10,10);
      this.context.fillText(`d=${objetoMovel.distanciaParaOutro( objetoEstatico )}`,10,20);
      this.context.fillText(`rel_sen=${ objetoMovel.senoRelativoParaOutro( objetoEstatico ) }`,10,30);
      this.context.fillText(`rel_cos=${ objetoMovel.cossenoRelativoParaOutro( objetoEstatico ) }`,10,40);
      this.context.fillText(`grau_B_ate_A=${ objetoMovel.correcaoDirecionalParaOutro( objetoEstatico ) }`,10,50);
    }
    else this.context.fillText( "ERRO: objetoMovel e ou objetoEstatico são indefinidos", 10, 10);
  }

  getObjetoControlavel()
  {
    return this.objetos[0];
  }

};

export { RenderizadorCanvasVa, LiteralEntradasVa };
