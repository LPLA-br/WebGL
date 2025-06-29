
/* Limita valor máximo e mínimo mas não oferece
 * resistência a supertransbordamento ou
 * subtransbordamento aplicando as correções
 * circulares*/
export class IrracionalCircularLimitado
{
  constructor( limitacaoSuperior=360, valor=0 )
  {
    this.limiteInferiorInclusivo = 0;
    this.limiteSuperiorInclusivo = limitacaoSuperior;
    this.valor = valor;
  }

  adicionar( x )
  {
    if ( (this.valor + x) <= this.limiteSuperiorInclusivo )
    {
      this.valor += x;
    }
    else
    {
      this.valor = ( this.valor + x ) % this.limiteSuperiorInclusivo;
    }
  }

  subtrair( x )
  {
    if ( (this.valor - x) >= this.limiteInferiorInclusivo )
    {
      this.valor -= x;
    }
    else
    {
      this.valor = Math.abs((this.valor - x + this.limiteSuperiorInclusivo ) % this.limiteSuperiorInclusivo);
    }
  }
}

