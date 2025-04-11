/*CLASSE GENÉRICA COM METODOS RELATIVOS AO TEMPO E SUA INFLUÊNCIA SOBRE EXECUÇÃO*/

export default class Tempo
{
  constructor()
  {}

  formatarTimestampSegundos( timestamp )
  {
    return +timestamp.toString().slice(0,10);
  }

  atrasar( segundos )
  {
    let tempoFinal = (this.formatarTimestampSegundos( new Date().getTime() ) + segundos);
    while( true )
    {
      if ( this.formatarTimestampSegundos((new Date().getTime())) > tempoFinal ) break;
    }
  }
}

