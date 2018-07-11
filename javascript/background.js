class Background {
    constructor (context) {
        this.particles = new Particles(context, 500, 0, false, null, null, true);
    }

	draw(pause) {
        this.particles.draw(pause);
	}
}