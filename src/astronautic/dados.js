/* Nenhuma forma de requisição à api https://api.le-systeme-solaire.net funcionou
 no node. Ignorando a capacidade débil, capenga, mole e bisonha do node de
 requisitar simples dados. Listando-os manualmente. */

/*diametroEquatorial move-se 3 casas decimais à esquerda
 *massa em kg */

/*0.330 	4.87 	5.97 	0.073 	0.642*/
export const dados =
{
  nulo:{
    diametroEquatorial:1,
    perigeu:0,
    aporgeu:0,
    massa: 0
  },
  sol:
  {
    diametroEquatorial: 1392.700,
    perigeu: 0,
    aporgeu: 0,
    massa: 0
  },
  mercurio:
  {
    diametroEquatorial: 4.879, 
    perigeu: 46,
    aporgeu: 0,
    massa: 0.330
  },
  venus:
  {
    diametroEquatorial: 12.104,
    perigeu: 107.5,
    aporgeu: 0,
    massa: 4.87
  },
  terra:
  {
    diametroEquatorial: 12.756,
    perigeu: 147.1,
    aporgeu: 0,
    massa: 5.97
  },
  lua:
  {
    diametroEquatorial: 3.475,
    perigeu: 0,
    aporgeu: 0,
    massa: 0.073
  },
  marte:
  {
    diametroEquatorial: 6.792,
    perigeu: 206.7,
    aporgeu: 0,
    massa: 0.642
  },
}

