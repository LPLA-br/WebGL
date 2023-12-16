import * as THREE from 'three';

export class Esfera
{

  raio;

  tex;
  geometry;
  material;
  esfera;

  constructor( raio=1, caminhoTextura )
  {
    this.raio = raio;
    this.tex = new THREE.TextureLoader().load( caminhoTextura );

    this.geometry = new THREE.SphereGeometry( raio, 20, 20 );
    this.material = new THREE.MeshBasicMaterial({ map: this.tex });
    this.esfera = new THREE.Mesh( this.geometry, this.material );
  }

  get_esfera()
  {
    return this.esfera;
  }
}
