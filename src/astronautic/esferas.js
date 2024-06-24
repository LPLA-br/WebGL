// geometricos
import * as THREE from 'three';

function novaEsfera( corpo, caminhoTextura, snece, nome )
{
    const { diametroEquatorial } = corpo[nome];

    let tex = new THREE.TextureLoader().load( caminhoTextura );
    let geometry = new THREE.SphereGeometry( (diametroEquatorial/2), 64, 32);
    let material = new THREE.MeshBasicMaterial({ map: tex });
    let esfera = new THREE.Mesh( geometry, material );

    esfera.position.x = corpo[nome].perigeu + 10;
    esfera.position.y;
    esfera.position.z;

    snece.add( esfera );
    return esfera;
}

export { novaEsfera }
