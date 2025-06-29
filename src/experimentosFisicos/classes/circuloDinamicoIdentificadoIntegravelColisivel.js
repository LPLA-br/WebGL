import CirculoDinamicoIdentificadoIntegravel from "./circuloDinamicoIdentificadoIntegravel";
import Angulo from "./angulo";

export default class CirculoDinamicoIdentificadoIntegravelColisivel extends CirculoDinamicoIdentificadoIntegravel
{
  //sobrescrita
  moverSe()
  {
    //Integração verlet velocidade
    //Respeita alteração dos atributos de velocidade
    //
    //Atualizar posição com velocidade e aceleração atuais
    // x = x + vx * dt + 0.5 * ax * dt**2
    // y = y + vy * dt + 0.5 * ay * dt**2
    //
    // Calcular nova aceleracao com base na nova posição
    // nova_ax = ARBITRÁRIO
    // nova_ay = ARBITRÁRIO
    //
    // Atualizar velocidade com média das acelerações
    // vx = vx + 0.5 * ( ax + nova_ax ) * dt
    // vy = vy + 0.5 * ( ay + nova_ay ) * dt
    //
    // Atualizar aceleração
    // ax = nova_ax
    // ay = nova_ay
    this.posicaoX = this.posicaoX + this.velocidadeX * this.deltaTempo + 0.5 * this.aceleracaoX * (this.deltaTempo ** 2)
    this.posicaoY = this.posicaoY + this.velocidadeY * this.deltaTempo + 0.5 * this.aceleracaoY * (this.deltaTempo ** 2)

    //aceleracao constante
    this.nova_aX = this.aceleracaoX;
    this.nova_aY = this.aceleracaoY;

    this.velocidadeX = this.velocidadeX + 0.5 * ( this.aceleracaoX + this.nova_aX) * this.deltaTempo
    this.velocidadeY = this.velocidadeY + 0.5 * ( this.aceleracaoY + this.nova_aY) * this.deltaTempo

    this.aceleracaoX = this.nova_aX;
    this.aceleracaoY = this.nova_aY;
  }

  //public
  inicializarAtributoVariavelDeColisao()
  {
    this.detecoesColisao = 0;
  }

  //public
  detectarColisao( outro )
  {
    if ( this.distanciaParaOutro( outro ) > (this.raio+outro.raio) )
    {
      this.detecoesColisao = 0;
    }
    else
    {
      this.detecoesColisao += 1;
    }
  }

  //extenção

  //private
  obterAnguloDoVetorDeAceleracaoEmRadianos()
  {
    //compreende todo ciclo trigonométrico (so que em radianos)
    //y,x , não x,y
    let theta_rad = Math.atan( this.aceleracaoY, this.aceleracaoX );

    if ( theta_rad < 0 )
    {
      theta_rad += Math.PI * 2;
      return theta_rad;
    }
    return theta_rad;
  }

  //private
  corrigirFinidadeDosGrausDoCicloTrigonometrico()
  {}

  //private
  atribuirNovaDirecaoParaAceleracaoCorrente( novaDirecaoGraus )
  {
    let moduloAceleracao = Math.sqrt( this.aceleracaoX**2 + this.aceleracaoY**2 );

    this.aceleracaoX = moduloAceleracao * Math.cos( novaDirecaoGraus*Math.PI/180 );
    this.aceleracaoY = moduloAceleracao * Math.sin( novaDirecaoGraus*Math.PI/180 );
  }

  //public
  ricochetearRepulsivamenteInelasticamente( outro )
  {
    this.detectarColisao( outro );
    if ( this.detecoesColisao != 1 ) return;

    let anguloDesteParaOutro = this.corrigirEObterDirecaoPara( outro );
    let anguloVetorAceleracao = (180/Math.PI * this.obterAnguloDoVetorDeAceleracaoEmRadianos());
    let grausDiferenca = 0.0;

    this.aceleracaoX += this.aceleracaoX*(-1);
    this.aceleracaoY += this.aceleracaoY*(-1);
    return;

    if ( anguloVetorAceleracao < anguloDesteParaOutro )
    {
      grausDiferenca = anguloDesteParaOutro + anguloVetorAceleracao;
      
      //adiciona duas vezes a diferença na inclinação do vetor de aceleracao.
      anguloVetorAceleracao += (grausDiferenca*2);

      //inverte
      let inverso = new Angulo( anguloVetorAceleracao ).anguloInverso();

      //aplicar nova direção ao vetor de aceleracao propriamente dito
      this.atribuirNovaDirecaoParaAceleracaoCorrente( inverso );
    }
    else if ( anguloVetorAceleracao > anguloDesteParaOutro )
    {
      grausDiferenca = anguloVetorAceleracao - anguloDesteParaOutro;

      //subtrai duas vezes a diferença na inclinação do vetor de aceleracao.
      anguloVetorAceleracao -= (grausDiferenca*2);

      //inverte
      let inverso = new Angulo( anguloVetorAceleracao ).anguloInverso();

      //aplicar nova direção ao vetor de aceleracao propriamente dito
      this.atribuirNovaDirecaoParaAceleracaoCorrente( inverso );
    }
    else if ( anguloVetorAceleracao == anguloDesteParaOutro )
    {
      //inverte vetor de aceleracao (perpendicular a superficie)
      this.aceleracaoX = this.aceleracaoX * (-1);
      this.aceleracaoY = this.aceleracaoY * (-1);
    }
  }
}

