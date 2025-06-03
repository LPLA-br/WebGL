/* INTEGRAÇÃO VERLET
 * Evitando erro cumulativo através do cálculo
 * infinitesimal Integral.
 * Difere do método Euler por memorizar
 * a posição anterior da partícula.
 */

// ------------------------------- VERLET -------------------------------

class CorpoVerlet
{
  constructor( posicaoX, posicaoY, massa )
  {
    this.posicaoX = posicaoX;
    this.posicaoY = posicaoY;
    this.antePosicaoX = posicaoX;
    this.antePosicaoY = posicaoY;
    this.massa = massa; //aceleração não arbitrária. Definida conforme massa.
  }
}


let corpo = new CorpoVerlet( 1, 1, 1 );

let tempo = 0.0;
let deltaTempo = 1.0;

/*
let forca = {x: 0.0, y: 0.1};
let aceleracao = {x: forca.x / corpo.massa, y: forca.y / corpo.massa};*/
let aceleracao = {x: 0, y: 0.1 };
let posicaoAnterior = {x: corpo.posicaoX, y: corpo.posicaoY}; // diferenciador de Euler para Vernet

function moverCorpo()
{
  posicaoAnterior = {x: corpo.posicaoX, y: corpo.posicaoY};

  corpo.posicaoX = 2 * corpo.posicaoX - corpo.antePosicaoX + aceleracao.x * (deltaTempo * deltaTempo);
  corpo.posicaoY = 2 * corpo.posicaoY - corpo.antePosicaoY + aceleracao.y * (deltaTempo * deltaTempo);

  corpo.antePosicaoX = posicaoAnterior.x;
  corpo.antePosicaoY = posicaoAnterior.y;
}

for ( tempo = 0; tempo < 10.0; tempo += deltaTempo )
{
  moverCorpo();
  console.log( `posicaoY=${corpo.posicaoY},antePosicaoY=${corpo.antePosicaoY},aceleracaoY=${aceleracao.y}` );
  //console.log( `posicaoX=${corpo.posicaoX},antePosicaoX=${corpo.antePosicaoX},aceleracaoX=${aceleracao.x}` );
}

if ( process.argv[2] == "-v" || process.argv[2] == "--verlet" ) process.exit();
console.log("\n\n\nEULER");

// --------------------- EULER ----------------------------

class CorpoUnidimensional
{
  constructor( posicao, velocidade, aceleracao, infinitesimalidade=1 )
  {
    this.posicao = posicao;
    this.infinitesimalidade = infinitesimalidade;
    this.velocidade = velocidade / infinitesimalidade;
    this.aceleracao = aceleracao / infinitesimalidade;
  }

  mover()
  {
    this.posicao += this.velocidade;
  }

  acelerar()
  {
    this.velocidade += this.aceleracao;
  }

  imprimirInformacoes()
  {
    console.log( `posição = ${this.posicao.toFixed(5)}; velocidade = ${this.velocidade.toFixed(5)}; aceleracao = ${this.aceleracao.toFixed(5)};` );
  }
  
  obterInfinitesimalidade()
  {
    return this.infinitesimalidade;
  }
}

class Programa
{
  constructor( corpo, espacoAmostral=10, salto=1 )
  {
    this.corpo = corpo;
    this.espacoAmostral = espacoAmostral;
    this.salto = salto; 
  }

  executar()
  {
    let contador = 0;

    // pode ser: 1/1s 1/10s 1/100s 1/1000s por unidade abaixo ...
    for ( let amostra = 0; amostra < this.espacoAmostral; amostra++ )
    {
      this.corpo.mover();
      this.corpo.acelerar();
      if ( contador == this.salto )
      {
        this.corpo.imprimirInformacoes();
        contador = 0;
      }
      contador++;
    }
  }
  
}

// segundo 1000ms 1m/s       (1m/s ·     1)     v(x)=x+1
// décima parte -> 100ms     (0.1m/s ·   10)    v(x)=x+0.1
// centésima parte -> 10ms   (0.01m/s ·  100)   v(x)=x+0.01
// milésima parte -> 1ms     (0.001m/s · 1000)  v(x)=x+0.001

if ( process.argv[2] == "-h" ) console.log( "infinitesimalidade numero_amostras saltar_n_amostras" );

const infinitesimalidade = +process.argv[2] || 1;
const espacoAmostral = +process.argv[3] || ( infinitesimalidade || 1 );
const saltos = +process.argv[4] || 1;

const p = new Programa( new CorpoUnidimensional( 0, 1 , 1, infinitesimalidade ), espacoAmostral , saltos );
p.executar();
