/* RENDERIZADOR CANVAS GENERICO */

//classe abstrata
export default class RenderizadorCanvas
{
  constructor( canvasId='#undefined', literalEntradas={} )
  {
    this.objetos = []; //lista genérica de qualquer objeto renderizável.

    this.literalEntradas = literalEntradas;

    this.canvas = document.querySelector( canvasId );
    this.context = undefined;
    if ( this.canvas.getContext )
    {
      this.context = this.canvas.getContext("2d");
    }
  }

  fundoPreto()
  {
    this.context.fillStyle = "#000000";
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height );
    this.context.fillRect( 0, 0, 1000, 1000 );
  }

  adicionarObjeto( objeto={} )
  {
    this.objetos.push( objeto );
  }

  removerObjetoDePosicao( posicao=0 )
  {
    return this.objetos.splice(posicao,1);
  }

  iniciarAmbienteDeObjetos()
  {}

  desenhar()
  {}
};

