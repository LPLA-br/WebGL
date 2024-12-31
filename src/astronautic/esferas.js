// esferas
import * as THREE from 'three';

const VERTICES = 64;

function novaEsfera( raio, caminhoTextura, opacidade=1, snece )
{
    const diametroEquatorial = raio * 2;

    let tex = new THREE.TextureLoader().load( caminhoTextura );
    let geometry = new THREE.SphereGeometry( (diametroEquatorial/2), VERTICES, VERTICES );
    let material = new THREE.MeshLambertMaterial(
      {
        map: tex,
        opacity: opacidade,
        transparent: true
      }
    );
    let esfera = new THREE.Mesh( geometry, material );

    esfera.position.x = 0;
    esfera.position.y = 0;
    esfera.position.z = 0;

    snece.add( esfera );
    return esfera;
}

function novaEsferaInrregular( raio, caminhoTextura, caminhoTexturaHeightmap, opacidade=1, escalaRelevo=1, scene )
{
  let textura = new THREE.TextureLoader().load( caminhoTextura );
  let texturaHeight = new THREE.TextureLoader().load( caminhoTexturaHeightmap );
  let geometry = new THREE.SphereGeometry( raio, VERTICES, VERTICES );
  let material = new THREE.MeshStandardMaterial(
    {
      map: textura,
      opacity: opacidade,
      displacementMap: texturaHeight,
      displacementScale: escalaRelevo,
    }
  );
  let esfera = new THREE.Mesh( geometry, material );

  esfera.position.x = 0;
  esfera.position.y = 0;
  esfera.position.z = 0;
  scene.add(esfera);

  return esfera;
}

export { novaEsfera, novaEsferaInrregular }
