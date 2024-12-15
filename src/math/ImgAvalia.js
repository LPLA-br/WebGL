/* avaliação de imagens https://gibberlings3.github.io/iesdp/file_formats/ie_formats/bmp.htm*/

/* Funções não muito correlatas: BMP para HeightMap*/

/* Converte pixel de escala de cinza para altura.
 * menorValorAltura <= x <= maiorValorAltura 
 * NÃO IMPLEMENTADO*/
function pixelParaAltura( pixel, menorValorAltura=0, maiorValorAltura=1, fator=1)
{
  let altura;
  return (altura)*fator;
}

/* retorna versão 32 bits de cor byte do tipo: 0xRRRGGGBB
 * passada. é escala de cinza se (r == g == b)
 * */
function converterCor8bitUint8Para32bitsRGBString( cor8b )
{
  if ( cor8b > 255 || cor8b < 0 ) return "0,0,0";
  return `rgba(${cor8b},${cor8b},${cor8b},255)`;
}

function converterCor8bitUint8Para32bitsHex( cor8b )
{
  if ( cor8b > 255 || cor8b < 0 || typeof cor8b == "undefined" ) return "#000000";
  return `#${(cor8b).toString(2)}`;
}

/* Extrai píxeles de uma imagem bitmap com profundidade de 8 bits
 * e sem compressão. retorna matriz de matrizes com x píxeles por
 * linha(sub-matriz). Depende de Buffer do node :-(
 *
 * */
function extrairPixelesParaMatrizDeMatrizesComBytes( bufferImagemBmp, largura, altura )
{
  const PRIMEIRO_BYTE_IMG_BMP = 0x37;

  let retorno = [];

  if ( largura == 0 || altura == 0 ) return [];

  let leitor = 0;
  for ( let lin = 0; lin < altura; lin++ )
  {
    retorno.push([]);

    let linha = [];
    for ( let col = 0; col < largura; col++ )
    {
      leitor++;
      if ( leitor < PRIMEIRO_BYTE_IMG_BMP ) continue;
      linha.push( bufferImagemBmp.readInt8( leitor ) );
    }

    retorno[ lin ] = linha;
  }
  return retorno;
}

/*versão generica que trabalha com matrizes de bytes representadas como string*/
function extrairPixelesParaMatrizDeMatrizesComBytesIndependente(  ImagemString, largura, altura  )
{
  const PRIMEIRO_BYTE_IMG_BMP = 0x37;

  let retorno = [];

  if ( largura == 0 || altura == 0 ) return [];

  let leitor = 0;
  for ( let lin = 0; lin < altura; lin++ )
  {
    retorno.push([]);

    let linha = [];
    for ( let col = 0; col < largura; col++ )
    {
      leitor++;
      if ( leitor < PRIMEIRO_BYTE_IMG_BMP ) continue;
      linha.push( ImagemString[ leitor ] );
    }

    retorno[ lin ] = linha;
  }
  return retorno;
}

/* Reproduz matriz de matrizes contendo bytes de cor para uma superficie canvas. */
function reproduzirImagemEmCanvas( matrizPixeles, tamPixeles=1, contextoCanvas )
{
  let altura = matrizPixeles.length;
  let largura = matrizPixeles[0].length;

  for ( let lin = 0; lin <= altura; lin += tamPixeles )
  {
    for ( let col = 0; col <= largura; col += tamPixeles )
    {
      try
      {
        contextoCanvas.fillStyle = converterCor8bitUint8Para32bitsHex( matrizPixeles[lin][col] );
        contextoCanvas.clearRect( lin, col, tamPixeles, tamPixeles );
        contextoCanvas.fillRect( lin, col, tamPixeles, tamPixeles );
      }
      catch (err)
      {
      }
    }
  } 
}

function reproduzirSequenciaBytesEmCanvas( imagemBytes, tamPixeles=1, contextoCanvas, larguraImagem=1, alturaImagem=1, byteInicial=37 )
{
  let leitor = byteInicial;

  for ( let x = 0 ; x < (larguraImagem*tamPixeles); x += tamPixeles )
  {
    for ( let y = 0 ; y < (alturaImagem*tamPixeles); y += tamPixeles )
    {
      contextoCanvas.fillStyle = converterCor8bitUint8Para32bitsRGBString( imagemBytes[ leitor ] );
      contextoCanvas.clearRect( x, y, tamPixeles, tamPixeles );
      contextoCanvas.fillRect( x, y, tamPixeles, tamPixeles );
      leitor++;
    }
  }
}

export { pixelParaAltura, converterCor8bitUint8Para32bitsRGBString,
  extrairPixelesParaMatrizDeMatrizesComBytesIndependente, converterCor8bitUint8Para32bitsHex,
  reproduzirImagemEmCanvas, reproduzirSequenciaBytesEmCanvas };
