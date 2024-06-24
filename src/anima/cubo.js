import {
  Mesh,
} from "three";

/**
 * Representação física cubo
 * */
export default class Cubo
{
  constructor( posicaox, posicaoy, posicaoz, materialGeometrico )
  {
    this.mesha = new Mesh( materialGeometrico.getGeometria(), materialGeometrico.getMaterial() );
    this.mesha.position.x = posicaox;
    this.mesha.position.y = posicaoy;
    this.mesha.position.z = posicaoz;
  }

  getCubo()
  {
    return this.mesha;
  }
};

