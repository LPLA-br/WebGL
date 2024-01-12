//características visuais de geometricos

function definirSkyBox( scene )
{
  const loader = new THREE.CubeTextureLoader();
  loader.setPath( './texturas/' );
  const textureCube = loader.load([
    'ceu.png','ceu.png','ceu.png'
    ,'ceu.png','ceu.png','ceu.png'
  ]);
  scene.background = textureCube;
}

export { definirSkyBox }
