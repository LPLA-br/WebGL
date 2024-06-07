
export default class EntradaTeclado
{

  /** camera: THREE.PerspectiveCamera objeto */
  constructor( camera )
  {
    this.camera = camera;
    this.camera.position.z = 10;
  }

  executar()
  {
    document.addEventListener("keydown", ( ev )=>
    {
      switch( ev.key )
      {
        case 'w':
          this.camera.position.z -= 1;
          break;
        case 'a':
          this.camera.position.x -= 1;
          break;
        case 's':
          this.camera.position.z += 1;
          break;
        case 'd':
          this.camera.position.x += 1;
          break;
        case 'ArrowLeft':
          break;
        case 'ArrowRight':
          break;
        case 'q':
          this.camera.position.y += 1;
          break;
        case 'z':
          this.camera.position.y -= 1;
          break;
        default:
          break;
      }
    });
  }
}

