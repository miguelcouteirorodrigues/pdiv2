class Background {
    constructor (context) {
        this.particles = new Particles(context, 500, 0, false, null, null);
    }

	draw(pause)
	{
        this.particles.draw(pause);
	}
}