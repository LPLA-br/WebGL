/* EXPERIMENTOS EVOLUTIVOS PARA SIMULAÇÃO GRAVITACIONAL */

import RenderizadorCanvas from "./classes/renderizadorCanvas";
import CirculoDinamicoIdentificado from "./classes/circuloDinamicoIdentificado";

const LiteralEntradasVa = 
{
  canvas:document.getElementById("gravidadeSuperficie"),
  aceleX:document.getElementById("aceleY")             ,
  aceleY:document.getElementById("aceleX")
};

class RenderizadorCanvasVa extends RenderizadorCanvas
{
  constructor( canvasId="", literalEntradas={} )
  {
    super(canvasId,literalEntradas);
  }

  iniciarAmbienteDeObjetos()
  {
    /*representações informacionais -> Fonte de strings mágicas.*/
    this.objetos.push(new CirculoDinamicoIdentificado( 5, 300, 400, 0, 0, 0, 0, 10, "movel" ));
    this.objetos.push(new CirculoDinamicoIdentificado( 10, 500, 500, 0, 0, 0, 0, 1000000000, "fixo" ));
    
    //tratador de eventos
    document.addEventListener("keydown", this.aoBaixarDeUmaTecla, false);
  }

  desenhar()
  {
    if (this.canvas.getContext)
    {
      this.context = this.canvas.getContext("2d");
      this.fundoPreto();
      this.context.fillStyle = "#FFFFFF";
      this.renderizarCorpos();
      //this.renderizarVetorParaAlvo( "movel", "red" );
      //this.renderizarInformacoes();
      this.atualizarRenderizaçãoPosicionalObjetos();
    }
  }

  // ----- superconjunto -----

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
    this.objetos[0].acelerarArbritariamenteParaObjeto( 0.01, this.objetos[1]);
    for ( let i=0; i<this.objetos.length; i++ )
    {
      this.objetos[i].moverSe();
      this.objetos[i].acelerar();
    }
  }

  renderizarVetorParaAlvo( identificador="", cor="red" )
  {
    let referenciaObjeto = this.objetos.filter( alvo =>
    {
      if (alvo.identificador == identificador) return alvo;
      return undefined;
    });

    if ( referenciaObjeto )
    {
      console.error( "renderizarVetorParaAlvo: filter falhou: " + referenciaObjeto );
      return;
    }

    this.context.strokeStyle = cor;
    this.context.beginPath();
    this.context.moveTo( referenciaObjeto.posicaoX, referenciaObjeto.posicaoY );
    this.context.lineTo( 
      referenciaObjeto.posicaoX + referenciaObjeto.velocidadeX*8,
      referenciaObjeto.posicaoY + referenciaObjeto.velocidadeY*8
    );
    this.context.stroke();
  }

  renderizarInformacoes()
  {
    // STRINGS MÁGICAS PARA VARIAR
    let objetoMovel = this.objetos.filter( (alvoMovel) =>
    {
      if( alvoMovel.identificador === "movel" ) return alvoMovel;
      return undefined;
    });
    let objetoEstatico = this.objetos.filter( (alvoEstatico) =>
    {
      if( alvoEstatico.identificador === "fixo" ) return alvoEstatico;
      return undefined;
    });

    if ( objetoMovel && objetoEstatico )
    {
      console.error( "renderizarInformacoes: filter falhou");
      return;
    }

    if ( objetoMovel !== undefined && objetoEstatico !== undefined )
    {
      this.context.fillText(`${JSON.stringify( objetoMovel )}`,10,10);
      this.context.fillText(`d=${objetoMovel.distanciaParaOutro( objetoEstatico )}`,10,20);
      this.context.fillText(`rel_sen=${ objetoMovel.senoRelativoParaOutro( objetoEstatico ) }`,10,30);
      this.context.fillText(`rel_cos=${ objetoMovel.cossenoRelativoParaOutro( objetoEstatico ) }`,10,40);
      this.context.fillText(`grau_B_ate_A=${ objetoMovel.correcaoDirecionalParaOutro( objetoEstatico ) }`,10,50);
      this.context.fillText(`grau_A_ate_B=${ objetoMovel.anguloInverso(objetoMovel.correcaoDirecionalParaOutro( objetoEstatico )) }`,10,60);
    }
    else this.context.fillText( "ERRO: objetoMovel e ou objetoEstatico são indefinidos", 10, 10);
  }

  async aoBaixarDeUmaTecla( event ) 
  {
    let keyCode = event.which;

    if (keyCode == 87) //w
    {
      o.aceleracaoY -= 0.01;
    }
    else if (keyCode == 83) //s
    {
      o.aceleracaoY += 0.01;
    }
    else if (keyCode == 68 ) //d
    {
      o.aceleracaoX += 0.01;
    }
    else if (keyCode == 65 ) //a
    {
      o.aceleracaoX -= 0.01;
    }
    else if ( keyCode == 81 ) //q
    {
      o.velocidadeX = 0;
      o.velocidadeY = 0;
      o.aceleracaoX = 0;
      o.aceleracaoY = 0;
    }
  };
};

export { RenderizadorCanvasVa, LiteralEntradasVa };
