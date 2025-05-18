
//em implementação ...
export default class Radiano
{
  constructor( rad=1 )
  {
    this.rad = rad;
  }

  radianosParaGraus( graus=0 )
  {
    return (this.rad * (180 / Math.PI));
  }
}

