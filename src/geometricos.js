// geometricos
import * as THREE from 'three';

//testa funcionamento do canvas adicionando cubo verde.
function adicionarCuboDeTeste( scene )
{
  const g = new THREE.BoxGeometry(1,1,1);
  const m = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  const c = new THREE.Mesh( g, m );
  scene.add( c );
}

/** gera esferas de baixa qualidade.
 *  @Param {object} - dados de corpos celestes reais.
 *  @Param {string} - string de caminho até a textura para esfera.
 *  @Param {THREE.snece} - referência para "snece" THREE
 *  @Param {string} - nome correto do objeto presente nos dados.
 * */
function novaEsfera( corpo, caminhoTextura, snece, nome )
{
    const { diametroEquatorial } = corpo[nome];

    let tex = new THREE.TextureLoader().load( caminhoTextura );
    let geometry = new THREE.SphereGeometry( (diametroEquatorial/2), 64, 32);
    let material = new THREE.MeshBasicMaterial({ map: tex });
    let esfera = new THREE.Mesh( geometry, material );

    snece.add( esfera );
    return esfera;
}

export { adicionarCuboDeTeste, novaEsfera }
