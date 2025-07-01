import CirculoDinamicoIdentificadoIntegravel from "./circuloDinamicoIdentificadoIntegravel";
import Angulo from "./angulo";
import { IrracionalCircularLimitado } from "./irracionalCircularLimitado";

export default class CirculoDinamicoIdentificadoIntegravelColisivel extends CirculoDinamicoIdentificadoIntegravel
{
  //sobrescrita²
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
    this.posicaoX = this.posicaoX + this.velocidadeX * this.deltaTempo + 0.5 * this.aceleracaoX * (this.deltaTempo ** 2);
    this.posicaoY = this.posicaoY + this.velocidadeY * this.deltaTempo + 0.5 * this.aceleracaoY * (this.deltaTempo ** 2);

    //aceleração (acelerarArbritariamenteParaObjeto ou modificar os dois abaixo)
    this.nova_aX = 0;
    this.nova_aY = 0;

    this.velocidadeX = this.velocidadeX + 0.5 * ( this.aceleracaoX + this.nova_aX) * this.deltaTempo;
    this.velocidadeY = this.velocidadeY + 0.5 * ( this.aceleracaoY + this.nova_aY) * this.deltaTempo;

    this.aceleracaoX = this.nova_aX;
    this.aceleracaoY = this.nova_aY;
  }

  //extenção

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
  atribuirNovaDirecaoParaAceleracaoVelocidadeCorrente( novaDirecaoGraus )
  {
    let moduloVelocidade = Math.sqrt( this.velocidadeX**2 + this.velocidadeY**2 );
    let moduloAceleracao = Math.sqrt( this.aceleracaoX**2 + this.aceleracaoY**2 );

    this.velocidadeX = moduloVelocidade * Math.cos( novaDirecaoGraus * Math.PI/180 );
    this.velocidadeY = moduloVelocidade * Math.sin( novaDirecaoGraus * Math.PI/180 );
    this.aceleracaoX = moduloAceleracao * Math.cos( novaDirecaoGraus * Math.PI/180 );
    this.aceleracaoY = moduloAceleracao * Math.sin( novaDirecaoGraus * Math.PI/180 );
  }

  //public
  ricochetearRepulsivamenteInelasticamente( outro )
  {
    this.detectarColisao( outro );
    if ( this.detecoesColisao != 1 ) return;
    console.log( this.detecoesColisao, "COLISÃO" );

    let anguloAdOutrem = this.corrigirEObterDirecaoPara( outro );
    let anguloVetorAceleracao = (180/Math.PI * this.obterAnguloDoVetorDeAceleracaoEmRadianos());
    let grausDiferenca = 0.0;

    if ( anguloVetorAceleracao < anguloAdOutrem )
    {
      //grausDiferenca = anguloAdOutrem + anguloVetorAceleracao;
      let corretor = new IrracionalCircularLimitado();
      corretor.definirValorInicial( anguloAdOutrem );
      corretor.adicionar( anguloVetorAceleracao );
      grausDiferenca = corretor.obterValorCorrigido();
      
      //adiciona duas vezes a diferença na inclinação do vetor de aceleracao.
      anguloVetorAceleracao += (2*grausDiferenca);

      //inverte
      let inverso = new Angulo( anguloVetorAceleracao ).anguloInverso();

      //aplicar nova direção ao vetor de aceleracao propriamente dito
      this.atribuirNovaDirecaoParaAceleracaoVelocidadeCorrente( inverso );
    }
    else if ( anguloVetorAceleracao > anguloAdOutrem )
    {
      //grausDiferenca = anguloVetorAceleracao - anguloAdOutrem;
      let corretor = new IrracionalCircularLimitado();
      corretor.definirValorInicial( anguloAdOutrem );
      corretor.subtrair( anguloVetorAceleracao );
      grausDiferenca = corretor.obterValorCorrigido();

      //subtrai duas vezes a diferença na inclinação do vetor de aceleracao.
      anguloVetorAceleracao -= (2*grausDiferenca);

      //inverte
      let inverso = new Angulo( anguloVetorAceleracao ).anguloInverso();

      //aplicar nova direção ao vetor de aceleracao propriamente dito
      this.atribuirNovaDirecaoParaAceleracaoVelocidadeCorrente( inverso );
    }
    else if ( anguloVetorAceleracao == anguloAdOutrem )
    {
      this.velocidadeX = this.velocidadeX * (-1);
      this.velocidadeY = this.velocidadeY * (-1);
      this.aceleracaoX = this.aceleracaoX * (-1);
      this.aceleracaoY = this.aceleracaoY * (-1);
    }
  }
}

