// geometricos

//testa funcionamento do canvas
function adicionarCuboDeTeste( scene )
{
  const g = new THREE.BoxGeometry(1,1,1);
  const m = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  const c = new THREE.Mesh( g, m );
  scene.add( c );
}

//gera esferas de baixa qualidade.
function novaEsfera( corpo, caminhoTextura, snece, nome )
{
    const { diametroEquatorial } = corpo[nome];

    let tex = new THREE.TextureLoader().load( caminhoTextura );
    let geometry = new THREE.SphereGeometry( (diametroEquatorial/2), 20, 20 );
    let material = new THREE.MeshBasicMaterial({ map: tex });
    let esfera = new THREE.Mesh( geometry, material );

    snece.add( esfera );
    return esfera;
}

export { adicionarCuboDeTeste, novaEsfera }
