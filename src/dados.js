/* Nenhuma forma de requisição à api https://api.le-systeme-solaire.net funcionou
 no node. Ignorando a capacidade débil, capenga, mole e bisonha do node de
 requisitar simples dados. Listando-os manualmente. */

/*diametroEquatorial em km divididos por 10.000 (divisão temporária)
  perigeu e aporgeu em X*10⁶ 
*/
export const corpo =
{
  nulo:{ diametroEquatorial:1, perigeu:0, aporgeu:0 },
  sol:
  {
    diametroEquatorial: 139.2700,
    perigeu: 0,
    aporgeu: 0
  },
  mercurio:
  {
    diametroEquatorial: 0.4879, 
    perigeu: 46,
    aporgeu: 0
  },
  venus:
  {
    diametroEquatorial: 0.12104,
    perigeu: 107.5,
    aporgeu: 0
  },
  terra:
  {
    diametroEquatorial: 0.12756,
    perigeu: 147.1,
    aporgeu: 0
  },
  lua:
  {
    diametroEquatorial: 0.3475,
    perigeu: undefined,
    aporgeu: undefined
  },
  marte:
  {
    diametroEquatorial: 0.6792,
    perigeu: 206.7,
    aporgeu: 0
  },
}

