//física geral

function velocidade( posicao, velocidade, aceleracao )
{
  return (posicao + velocidade) + aceleracao;
}

function alterarAceleracao( aceleracao, taxa )
{
  return aceleracao + taxa;
}

export { velocidade, alterarAceleracao };
