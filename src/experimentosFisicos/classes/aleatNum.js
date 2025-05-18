
export default class AleatNum
{
  constructor()
  {
    //private
    this.aleatnum = 0;
  }

  obterNumeroAleatorioEntre( max, min )
  {
    this.aleatnum = Math.floor( (Math.random() * (max - min + 1)) ) + min ;
    return this.aleatnum;
  }

}

