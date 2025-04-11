/* CLASSE DE ÂNGULO. IMPEMENTAÇÃO MAIS SIMPLES POSSÍVEL */

export default class Angulo
{
  constructor( angulo )
  {
    this.angulo = (angulo > 360 || angulo < 0) ? (45) : (angulo) ;
  }

  grausParaRadianos()
  {
    return (this.angulo*(Math.PI/180));
  }

  definirNovoAngulo( graus )
  {
    this.angulo = (graus > 360 || graus < 0) ? (this.angulo) : (graus) ;
  }

  incrementarAngulo()
  {
    this.angulo = ((this.angulo + 1) > 360) ? (0) : (this.angulo+1) ;
  }

  decrementarAngulo()
  {
    this.angulo = ((this.angulo - 1) < 0) ? (360) : (this.angulo-1) ;
  }

  /** retorna uma lista com 360 números de ângulo.
   *  inicioOutro - ângulo zero deste corresponde a angulo X daquele.
   *  outroInvertido - outro gira em direção contraria à minha.
   * */
  mapearCirculoAngularParaOutroDiferente( inicioOutro=0, outroInvertido=false )
  {
    let mapa = [];
    let circuloB = inicioOutro;

    for( let circuloA = 0; circuloA <= 360; circuloA++ )
    {
      if ( circuloB > 360 ) circuloB = 0;
      if ( circuloB < 0 ) circuloB = 360;

      if ( circuloB != -1 ) mapa.push( circuloB );

      if ( outroInvertido == true ) circuloB--;
      else circuloB++;
    }
    while( mapa.length > 360 ) mapa.pop();
    return mapa;
  }
};

