
class SistemaControleReacao
{
  constructor()
  {
    this.modo = 't'; //'t'|'r'
  }

  rotacao()
  {}

  translacao()
  {}
}

export class Espaconave
{

  combustivel;      //kg
  pesoEstrutural;   //kg
  empuxo;           //Newtons

  constructor( combustivel, pesoEstrutural, empuxo )
  {
    this.rcs = new SistemaControleReacao();

    this.combustivel = combustivel;
    this.pesoEstrutural = pesoEstrutural;
    this.empuxo = empuxo;
  }

  iniciarMotor()
  {}

}

