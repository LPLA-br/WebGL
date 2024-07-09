
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
        case 'x':
          this.camera.parar();
          break;
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

        case 'q':
          this.camera.acelerarCameraEixoY( 0.01 );
          break;
        case 'z':
          this.camera.acelerarCameraEixoY( -0.01 );
          break;

        case 't':
          this.camera.camera.rotateX(0.1);
          break;
        case 'g':
          this.camera.camera.rotateX(-0.1);
          break;

        case 'f':
          this.camera.camera.rotateY(0.1);
          break;
        case 'h':
          this.camera.camera.rotateY(-0.1);
          break;

        default:
          break;
      }
    });
  }
};

export { Controle };
