import Cubo from "./cubo";

export default class SerVivo extends Cubo
{
  constructor( posicaox, posicaoy, posicaoz, materialGeometrico )
  {
    super( posicaox, posicaoy, posicaoz, materialGeometrico );
    this.tipo = "SerVivo";
  }
}

