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
    massa: 0,
    rotacao: 0
  },
  sol:
  {
    diametroEquatorial: 10,
    perigeu: 0,
    aporgeu: 0,
    massa: 0,
    rotacao: 0
  },
  mercurio:
  {
    diametroEquatorial: 0.4879, 
    perigeu: 0.46,
    aporgeu: 0,
    massa: 0.330,
    rotacao: 0
  },
  venus:
  {
    diametroEquatorial: 1.2104,
    perigeu: 10.75,
    aporgeu: 0,
    massa: 4.87,
    rotacao: 0
  },
  terra:
  {
    diametroEquatorial: 1.2756,
    perigeu: 14.71,
    aporgeu: 0,
    massa: 5.97,
    rotacao: 0
  },
  lua:
  {
    diametroEquatorial: 0.3475,
    perigeu: 0,
    aporgeu: 0,
    massa: 0.073,
    rotacao: 0
  },
  marte:
  {
    diametroEquatorial: 0.6792,
    perigeu: 20.67,
    aporgeu: 0,
    massa: 0.642,
    rotacao: 0
  },
}

