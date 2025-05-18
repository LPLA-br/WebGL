/* CLASSES QUE IMPLEMENTAM FÍSICA DA FORMA MAIS SIMPLES POSSÍVEL */

class Gravidade
{
  constructor( ConstanteGravitacionalUniversal=1, objetoA={}, objetoB={} )
  {
    this.G = ConstanteGravitacionalUniversal;
    this.objetoA = objetoA;
    this.objetoB = objetoB;
  }

  forcaGravitacionalDoisCorpos()
  {
    return (this.G * this.objetoA.massa * this.objetoB.massa) / this.objetoA.distanciaParaOutro( this.objetoB );
  }

};

export { Gravidade };
