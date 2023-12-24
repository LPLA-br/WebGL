import { Esfera } from './esfera';

export class CorpoCelesteEsferico
extends Esfera
{
  nome;

  massa;                      // kg
  densidadeMedia;             // g/cm³

  diametroEquatorial;         // km
  gravidadeEquatorial;        // m/s²
  perigeu;                    //UA
  aporgeu;                    //UA

  rotacaoGrausPorSegundo;     // radianos/segundo terra = (7.29^-5)= 0.00004856~
  orientacaoRotacao;          // ('horario'|'anti-horario') = (-=,+=)
  velocidadeEscape;           // km/s
  inclinacaoAxial;            //graus decimais.

  temAtmosfera;               //booleano
  pressaoAtmosferica;         //kpa ao nível do mar ou altura média da superfície.

  /** dados corpo.NOME
   *  caminhoTextura
   *  nome
   * */
  constructor( corpo, caminhoTextura, nome='nulo' )
  {
    super( (corpo[`${nome}`].diametroEquatorial / 2) , caminhoTextura );
    this.nome = nome;
  }

}
