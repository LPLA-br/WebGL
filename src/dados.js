/* Nenhuma forma de requisição à api https://api.le-systeme-solaire.net funcionou
 no node. Ignorando a capacidade débil, capenga, mole e bisonha do node de
 requisitar simples dados. Listando-os manualmente. */

/*diametroEquatorial move-se 3 casas decimais à esquerda*/
export const corpo =
{
  nulo:{ diametroEquatorial:1, perigeu:0, aporgeu:0 },
  sol:
  {
    diametroEquatorial: 1392.700,
    perigeu: 0,
    aporgeu: 0
  },
  mercurio:
  {
    diametroEquatorial: 4.879, 
    perigeu: 46,
    aporgeu: 0
  },
  venus:
  {
    diametroEquatorial: 12.104,
    perigeu: 107.5,
    aporgeu: 0
  },
  terra:
  {
    diametroEquatorial: 12.756,
    perigeu: 147.1,
    aporgeu: 0
  },
  lua:
  {
    diametroEquatorial: 3.475,
    perigeu: undefined,
    aporgeu: undefined
  },
  marte:
  {
    diametroEquatorial: 6.792,
    perigeu: 206.7,
    aporgeu: 0
  },
}

