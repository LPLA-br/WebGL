
export default class Terreno
{

  /** parâmetro blocoGenerico Classe derivada de Cubo */
  constructor( largura, comprimento, altura, materialGeometrico )
  {
    this.terreno = [];
    this.largura = largura;
    this.comprimento = comprimento;
    this.altura = altura;
    this.materialGeometrico = materialGeometrico;

  }

  gerarTerreno( blocoGenerico )
  {
    const taxa = 9;
    if ( this.largura >= 0 || this.comprimento >= 0 || this.altura >= 0 )
    {
      for( let x = 0; x < this.largura; x++ )
      {
        for( let y = 0; y < this.comprimento; y++ )
        {
          for( let z = 0; z < this.altura; z++ )
          {
            this.terreno.push( new blocoGenerico( x, y, z, this.materialGeometrico ) );
            z += taxa;
          }
          y += taxa;
        }
        x += taxa;
      }
    }
    else throw new Error( `largura, comprimento ou altura inválidos` );
  }

  /** returna Array<Herdeiros_de_Cubo> */
  getTerreno()
  {
    return this.terreno;
  }

};

