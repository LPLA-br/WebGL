import Cubo from "./cubo";

export default class Solo extends Cubo
{
  constructor( posicaox, posicaoy, posicaoz, materialGeometrico )
  {
    super( posicaox, posicaoy, posicaoz, materialGeometrico );
    this.tipo = "Solo";
  }
};

