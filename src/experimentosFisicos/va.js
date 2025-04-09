/* EXPERIMENTOS EVOLUTIVOS PARA SIMULAÇÃO GRAVITACIONAL */

import RenderizadorCanvas from "./renderizadorCanvas";
import { grauParaRadiano, radianoParaGrau } from "./funcoes-va";
import CirculoDinamicoIdentificado from "./circuloDinamicoIdentificado";

const LiteralEntradasVa = 
{
  canvas:document.getElementById("gravidadeSuperficie"),
  aceleX:document.getElementById("aceleY")             ,
  aceleY:document.getElementById("aceleX")
};

class renderizadorCanvasVa extends RenderizadorCanvas
{
  constructor( canvasId="", literalEntradas={} )
  {
    super(canvasId,literalEntradas);
    this.path2DList = [];
  }

  iniciarAmbienteDeObjetos()
  {
    //representações informacionais.
    this.objetos.push(new CirculoDinamicoIdentificado( 5, 300, 400, 0, 0, 0, 0, 10, "movel" ));
    this.objetos.push(new CirculoDinamicoIdentificado( 10, 500, 500, 0, 0, 0, 0, 1000000000, "fixo" ));
    
    // objetos renderizáveis
    for( let i=0; i<this.objetos.length; i++ )
    {
      this.path2DList.push( this.construirPath2D( this.objetos[i] ) );
    }

    //tratador de eventos
    document.addEventListener("keydown", this.aoBaixarDeUmaTecla, false);
  }

  //private
  construirPath2D( objeto={} )
  {
    return new Path2D().arc( objeto.posicaoX, objeto.posicaoY, objeto.raio, 0, (2 * Math.PI)  );
  }

  desenhar()
  {
    if (this.canvas.getContext)
    {
      this.context = canvas.getContext("2d");
      this.fundoPreto();

      this.context.fillStyle = "#FFFFFF";


      let aceleracaoArbitrária = 0.01;
      if ( o.posicaoX < planeta.posicaoX )
      {
        aceleracaoArbitrária = 0.01;
        o.aceleracaoX = aceleracaoArbitrária * cossenoRelativo(o,planeta,d);
        o.aceleracaoY = aceleracaoArbitrária * senoRelativo(o,planeta,d);
      }
      else
      {
        aceleracaoArbitrária = -0.01;
        o.aceleracaoX = aceleracaoArbitrária * cossenoRelativo(o,planeta,d);
        o.aceleracaoY = aceleracaoArbitrária * senoRelativo(o,planeta,d);
      }
    }
  }

  // ----- superconjunto -----

  renderizarCorpos()
  {
    if ( this.objeto.length != this.path2DList.length )
      throw new Error("this.objetos e this.path2DList tamanhos diferentes!");
    for ( let i=0; i<this.path2DList.length; i++ )
    {
      this.context.fill( this.path2DList[i] );
      this.objetos[i].moveSe();
      this.objetos[i].acelerar();
    }
  }

  renderizarVetorParaAlvo( identificador="", cor="red" )
  {
    let referenciaObjeto = this.path2DList.filter( o =>
    {
      if (o.identificador == identificador) return o;
      return undefined;
    });

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
    // Strings mágicas para variar
    let objetoMovel = this.objetos.filer( (o) => { if( o.identificador === "movel" ) return o; return undefined; });
    let objetoEstatico = this.objetos.filer( (o) => { if( o.identificador === "fixo" ) return o; return undefined; });

    if ( objetoMovel !== undefined )
    {
      this.context.fillText(`${JSON.stringify( objetoMovel )}`,10,10);
      this.context.fillText(`d=${objetoMovel.distanciaParaOutro( objetoEstatico )}`,10,20);
      this.context.fillText(`rel_sen=${ objetoMovel.senoRelativoParaOutro( objetoEstatico ) }`,10,30);
      this.context.fillText(`rel_cos=${ objetoMovel.cossenoRelativoParaOutro( objetoEstatico ) }`,10,40);
      this.context.fillText(`grau_B_ate_A=${ objetoMovel.correcaoDirecionalParaOutro( objetoEstatico ) }`,10,50);
      this.context.fillText(`grau_A_ate_B=${ objetoMovel.anguloInverso(objetoMovel.correcaoDirecionalParaOutro( objetoEstatico )) }`,10,60);
    }
    else this.context.fillText( "objetoMovel é indefinido", 10, 10);
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

export { renderizadorCanvasVa, LiteralEntradasVa };
