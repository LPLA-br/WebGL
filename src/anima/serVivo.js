import Cubo from "./cubo";

export default class SerVivo extends Cubo
{
  constructor( posicaox, posicaoy, posicaoz  )
  {
    super( 10, 10, 20, posicaox, posicaoy, posicaoz );

    this.volumeAgua = 10;
    this.energia = 10;
    this.comidaProcessatura = 10;
    this.energia = 10;
  }

  avancarNoEixoX()
  {
    this.cubo.position.x += 1;
  }

  retrocederNoEixoX()
  {
    this.cubo.position.x -= 1;
  }

  //executa constantemente em paralelo

  fome()
  {
    while( true )
    {
      setTimeout( ()=>
        {
          this.energia -= 1;
        }
      , 1000);
    }
  }

}

