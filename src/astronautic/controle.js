
class Controle
{
  /** camera:Camera */
  constructor( camera )
  {
    this.camera = camera;
  }

  executar()
  {
    document.addEventListener("keydown", ( ev )=>
    {
      switch( ev.key )
      {
        case 'w':
          this.camera.acelerarCameraEixoZ( -0.01 );
          break;
        case 'a':
          this.camera.acelerarCameraEixoX( -0.01 );
          break;
        case 's':
          this.camera.acelerarCameraEixoZ( 0.01 );
          break;
        case 'd':
          this.camera.acelerarCameraEixoX( 0.01 );
          break;
        case 'ArrowLeft':
          break;
        case 'ArrowRight':
          break;
        case 'q':
          this.camera.acelerarCameraEixoY( 0.01 );
          break;
        case 'z':
          break;
        case 'e':
          this.camera.camera.rotateY(-0.1);
          break;
        case 'r':
          this.camera.camera.rotateY(0.1);
          break;
        default:
          break;
      }
    });
  }
};

export { Controle };
