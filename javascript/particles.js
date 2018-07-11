class Particles {
    constructor (context, maxParticles, angle, addtoAngle, particles, img, reuseElements) {
        this.ctx = context;
        
        //canvas dimensions
        this.W = window.innerWidth;
        this.H = window.innerHeight;
        
        //particles
		if (particles == null) {
			this.mp = maxParticles; //max particles
			this.particles = [];
			for(var i = 0; i < this.mp; i++)
			{
				this.particles.push({
					x: Math.random() * this.W, //x-coordinate
					y: Math.random() * this.H, //y-coordinate
					r: Math.random() * 5, //radius
					d: Math.random() * this.mp, //density
					rt: null //rotation
				})
			}
		}
		else {
			this.particles = particles;
			this.mp = this.particles.length;
			this.img = img;
		}

        this.angle = angle;
		this.addtoAngle = addtoAngle;
		
		this.reuseElements = reuseElements;
    }

	draw(pause)
	{
        this.ctx.save();
		
		this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
		this.ctx.beginPath();

		for(var i = 0; i < this.mp; i++)
		{
			var p = this.particles[i];
			if (this.img == null) {
				this.ctx.moveTo(p.x, p.y);
				this.ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
			}
			else {
				//let center = new Point(p.x - (this.img.width * p.r) / 2, p.y - (this.img.height * p.r) / 2);
				let center = new Point(((this.img.width * p.r) / 2) * -1, ((this.img.height * p.r) / 2) * -1);
				this.ctx.translate(p.x, p.y);
				this.ctx.rotate(p.rt);
				this.ctx.drawImage(this.img, center.x, center.y, this.img.width * p.r, this.img.height * p.r);
				this.ctx.rotate(p.rt * -1);
				this.ctx.translate(p.x * -1, p.y * -1);
			}
		}
		this.ctx.fill();
		if (!pause) {
			this.update();
		}
		this.ctx.closePath();
        this.ctx.restore();
	}

	update()
	{
        if (this.addtoAngle) {
            this.angle += 0.01;
        }

		for(var i = 0; i < this.mp; i++)
		{
			var p = this.particles[i];

			p.y += Math.cos(this.angle+p.d) + 1 + p.r/2;
			p.x += Math.sin(this.angle) * 2;

			if (p.rt != null) {
				p.rt += 0.01;
			}
			
			if(p.x > this.W + 25 || p.x < -25 || p.y > this.H) {
				if (!this.reuseElements) {
					this.particles.splice(i, 1);
					this.mp = this.particles.length;
				}
				else {
					if(i%3 > 0)
					{
						this.particles[i] = {
							x: Math.random() * this.W, y: -10, r: p.r, d: p.d
						};
					}
					else {
						if(Math.sin(this.angle) > 0) {
							this.particles[i] = {
								x: -5, y: Math.random() * this.H, r: p.r, d: p.d
							};
						}
						else {
							this.particles[i] = {
								x: this.W + 5, y: Math.random() * this.H, r: p.r, d: p.d
							};
						}
					}
				}
			}
		}
	}
}