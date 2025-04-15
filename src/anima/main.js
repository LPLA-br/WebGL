import SerVivo from './serVivo';
import Solo from './solo';
import Terreno from './terreno';

import Renderizador from './renderizador';
import MaterialGeometrico from './materialGeometrico';

let materialEGeometria =
{
  "soloCubico": new MaterialGeometrico( 10,10,10, 'dirt.png' ),
  "serVivoCubico": new MaterialGeometrico( 10,10,10, 'serVivo.png' )
};

const geradorTerreno = new Terreno( 100, 100, 100, materialEGeometria.soloCubico, Solo );
geradorTerreno.gerarTerreno();
console.log( geradorTerreno.getTerreno() )

const r = new Renderizador( materialEGeometria );
r.adicionarObjetoAnimado(  new SerVivo( 0, 110, 0, materialEGeometria.serVivoCubico )  );
r.adicionarObjetosInanimados( geradorTerreno.getTerreno() );
r.adicionarTodosObjetosACena();
r.renderizar();
r.renderizarInformacoesEspaciais();

