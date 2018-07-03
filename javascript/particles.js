class Particles {
    constructor (context, maxParticles, angle, addtoAngle) {
        this.ctx = context;
        
        //canvas dimensions
        this.W = window.innerWidth;
        this.H = window.innerHeight;
        
        //particles
        this.mp = maxParticles; //max particles
        this.particles = [];
        for(var i = 0; i < this.mp; i++)
        {
            this.particles.push({
                x: Math.random() * this.W, //x-coordinate
                y: Math.random() * this.H, //y-coordinate
                r: Math.random() * 5, //radius
                d: Math.random() * this.mp //density
            })
        }

        this.angle = angle;
        this.addtoAngle = addtoAngle;
    }

	draw()
	{
        this.ctx.save();
        //this.ctx.clearRect(0, 0, this.W, this.H);
		
		this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
		this.ctx.beginPath();
		for(var i = 0; i < this.mp; i++)
		{
			var p = this.particles[i];
			this.ctx.moveTo(p.x, p.y);
			this.ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		this.ctx.fill();
        this.update();
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
			
			if(p.x > this.W + 5 || p.x < -5 || p.y > this.H)
			{
				if(i%3 > 0)
				{
					this.particles[i] = {x: Math.random() * this.W, y: -10, r: p.r, d: p.d};
				}
				else
				{
					if(Math.sin(this.angle) > 0)
					{
						this.particles[i] = {x: -5, y: Math.random() * this.H, r: p.r, d: p.d};
					}
					else
					{
						this.particles[i] = {x: this.W + 5, y: Math.random() * this.H, r: p.r, d: p.d};
					}
				}
			}
		}
	}
}