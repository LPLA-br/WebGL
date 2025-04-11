/*COLEÇÕES DE FUNÇÕES MISCELÂNEA PARA VA.JS
 *TODO: deprecar*/

function radianoParaGrau( radiano )
{
  return (radiano*180)/Math.PI;
}

function grauParaRadiano( grau )
{
  return grau*(Math.PI/180);
}

function distancia( objetoA, objetoB )
{
  return Math.sqrt( (objetoA.posicaoX - objetoB.posicaoX)**2 + (objetoA.posicaoY - objetoB.posicaoY)**2 );
}

//computa senoRelativo relativo a outro objeto
function senoRelativo( objetoA, objetoB, hipotenusa=1 )
{
  let oposto = 0;

  if ( objetoA.posicaoY > objetoB.posicaoY )
  {
    oposto = objetoA.posicaoY - objetoB.posicaoY;
  }
  else
  {
    oposto = objetoB.posicaoY - objetoA.posicaoY;
  }
  return oposto/hipotenusa;
}

function cossenoRelativo( objetoA, objetoB, hipotenusa=1  )
{
  let adjacente = 0;

  if ( objetoA.posicaoX > objetoB.posicaoX )
  {
    adjacente = objetoA.posicaoX - objetoB.posicaoX;
  }
  else
  {
    adjacente = objetoB.posicaoX - objetoA.posicaoX;
  }

  return adjacente/hipotenusa;
}

//Identifica quatrante relativo
function quadranteRelativo( objetoA, objetoB )
{
  if ( objetoA.posicaoX > objetoB.posicaoX && objetoA.posicaoY > objetoB.posicaoY )
  {
    return 4;
  }
  else if ( objetoA.posicaoX < objetoB.posicaoX && objetoA.posicaoY > objetoB.posicaoY )
  {
    return 3;
  }
  else if ( objetoA.posicaoX < objetoB.posicaoX && objetoA.posicaoY < objetoB.posicaoY )
  {
    return 2;
  }
  else if ( objetoA.posicaoX > objetoB.posicaoX && objetoA.posicaoY < objetoB.posicaoY   )
  {
    return 1;
  }
  return 1;
}

//possibilita obter ângulo verso e reverso.
function anguloInverso( angulo )
{
  if ( angulo <= 180 )
  {
    return angulo+180;
  }
  return angulo-180;
}

//aplica correção de ângulo por quadrante relativo ! DE A PARA OBJETO B (alvo) !
function correcao( objetoA, objetoB, d, quadrante )
{
  switch( quadrante )
  {
    case 1:
      return radianoParaGrau(Math.asin(Math.abs(senoRelativo(objetoA,objetoB,d))));
    case 2:
      return Math.abs(radianoParaGrau(Math.asin(Math.abs(senoRelativo(objetoA,objetoB,d))))-90)+90
    case 3:
      return Math.abs(radianoParaGrau(Math.asin(Math.abs(senoRelativo(objetoA,objetoB,d)))))+180
    case 4:
      return Math.abs(radianoParaGrau(Math.asin(Math.abs(senoRelativo(objetoA,objetoB,d))))-360)
    default:
      return 0;
  }
}

export { correcao, anguloInverso, quadranteRelativo, cossenoRelativo, distancia, grauParaRadiano, radianoParaGrau };
