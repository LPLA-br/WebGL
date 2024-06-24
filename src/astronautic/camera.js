
class Camera
{
  constructor( ax, ay, az, vx, vy, vz, px, py, pz, camera )
  {
		this.aceleracaoX = ax ;
		this.aceleracaoY = ay ;
		this.aceleracaoZ = az ;
		this.velocidadeX = vx ;
		this.velocidadeY = vy ;
		this.velocidadeZ = vz ;
		this.posicaoX =    px ;
		this.posicaoY =    py ;
		this.posicaoZ =    pz ;
    this.camera = camera  ;
  }

  getCamera()
  {
    return this.camera;
  }

//pontual

  acelerarCameraEixoX( aceleracao=0.01 )
  {
    this.aceleracaoX = aceleracao;
    this.velocidadeX = this.velocidadeX + this.aceleracaoX;
    this.aceleracaoX = 0;
  }

  acelerarCameraEixoY( aceleracao=0.01 )
  {
    this.aceleracaoY += aceleracao;
    this.velocidadeY = this.velocidadeY + this.aceleracaoY;
    this.aceleracaoY = 0;
  }

  acelerarCameraEixoZ( aceleracao=0.01 )
  {
    this.aceleracaoZ += aceleracao;
    this.velocidadeZ = this.velocidadeZ + this.aceleracaoZ;
    this.aceleracaoZ = 0;
  }

//contínuo

  moverCameraConformeVelocidade()
  {
    this.camera.position.x += this.velocidadeX;
    this.camera.position.y += this.velocidadeY;
    this.camera.position.z += this.velocidadeZ;
  }

};

export { Camera };

