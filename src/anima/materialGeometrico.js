import { TextureLoader, MeshBasicMaterial, BoxGeometry } from "three";

/** Representa Geometria e material de um cubo
 *  Evita recarregamento de arquivos na memoria
 * */
export default class MaterialGeometrico
{
  constructor( largura, altura, profundidade, nomeTextura )
  {
    this.geometriaDoCubo = new BoxGeometry( largura, altura, profundidade );
    this.carregador = new TextureLoader();
    this.matrizDeMateriais = [
        new MeshBasicMaterial( { map: this.carregador.load(`texturas/${nomeTextura}`) } ),
        new MeshBasicMaterial( { map: this.carregador.load(`texturas/${nomeTextura}`) } ),
        new MeshBasicMaterial( { map: this.carregador.load(`texturas/${nomeTextura}`) } ),
        new MeshBasicMaterial( { map: this.carregador.load(`texturas/${nomeTextura}`) } ),
        new MeshBasicMaterial( { map: this.carregador.load(`texturas/${nomeTextura}`) } ),
        new MeshBasicMaterial( { map: this.carregador.load(`texturas/${nomeTextura}`) } ),
    ];
  }

  getGeometria()
  {
    return this.geometriaDoCubo;
  }

  getMaterial()
  {
    return this.matrizDeMateriais;
  }

};
