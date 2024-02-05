//física geral

// altera velocidade para uma dimensão usando um valor de aceleração.
function velocidade( posicao, velocidade, aceleracao )
{
  return (posicao + velocidade) + aceleracao;
}

// altera aceleração para valor positivo ou negativo.
function alterarAceleracao( aceleracao, taxa )
{
  return aceleracao + taxa;
}

//obtêm aceleração atrativa entre corpos massivos.
function gravitacaoUniversal( massaA, massaB, distancia )
{
  const G = 0.00000000006674081;
  return (massaA*massaB*G)/(distancia^2);
}

// ?
function forca( massa, aceleracao )
{
  return massa * aceleracao;
}

export { velocidade, alterarAceleracao, gravitacaoUniversal, forca };
