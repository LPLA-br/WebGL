import { Esfera } from './esfera';

export const DIAMETRO_TERRESTRE = 12756;

export class CorpoCelesteEsferico
extends Esfera
{
  nome;

  massa;                      // kg
  densidadeMedia;             // g/cm³
  diametroEquatorial;         // 1 Terra = 12.756km
  gravidadeEquatorial;        // m/s²
  rotacaoGrausPorSegundo;     // graus/segundo
  orientacaoRotacao;          // ('horario'|'anti-horario') = (-=,+=)
  velocidadeEscape;           // km/s
  /*graus decimais. rotação subordinada à inclinação axial*/
  inclinacaoAxial;            //graus decimais
  temAtmosfera;               //booleano
  pressaoAtmosferica;         //kpa ao nível do mar ou altura média da superfície.

  constructor(
    diametroEquatorial,
    caminhoTextura,
    nome='indefinido',
  )
  {
    super( (diametroEquatorial / 2), caminhoTextura );
    this.diametroEquatorial = diametroEquatorial;
    this.nome = nome;
  }

  rotacionarCorpo( gps, orientacaoRotacao )
  {
    if ( orientacaoRotacao == 'anti-horario' )
      this.esfera.rotation.y += gps;
    else if ( orientacaoRotacao == 'horario' )
      this.esfera.rotation.y -= gps;
  }

}
