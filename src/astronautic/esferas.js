// esferas
import * as THREE from 'three';

function novaEsfera( raio, caminhoTextura, opacidade=1, snece )
{
    const diametroEquatorial = raio * 2;

    let tex = new THREE.TextureLoader().load( caminhoTextura );
    let geometry = new THREE.SphereGeometry( (diametroEquatorial/2), 64, 32);
    let material = new THREE.MeshLambertMaterial({ map: tex, opacity: opacidade, transparent: true});
    let esfera = new THREE.Mesh( geometry, material );

    esfera.position.x = 0;
    esfera.position.y = 0;
    esfera.position.z = 0;

    snece.add( esfera );
    return esfera;
}

export { novaEsfera }
