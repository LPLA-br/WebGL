
class Camera
{
  constructor( ax, ay, az, vx, vy, vz, px, py, pz )
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
  }
};

export { Camera };

