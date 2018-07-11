class Asteroids {
    constructor (context) {
        this.ctx = context;
        
        this.asteroids = [];
        this.img = new Image();
        this.img.src = "assets/asteroid.png";

        this.particles = null;
    }

    draw (pause) {
        if (this.asteroids.length == 0){
            if (!engine.powerUp && getRandomInt(0, 2) == 1 && ((engine.rounds + 1) % 5) == 0) {
                engine.powerUp = true;
                engine.rounds+=1;
            }
            
            if (!engine.powerUp) {
                let variance = getRandomInt(15, 25);

                for (var i = 1; i <= variance; i++) {
                    let x = getRandomInt(this.ctx.canvas.width / 18, this.ctx.canvas.width - (this.ctx.canvas.width / 18));
                    let y = -25;

                    this.asteroids.push({
                        x: x, //x-coordinate
                        y: y, //y-coordinate
                        r: 0.1, //radius
                        d: getRandomInt(1,5),
                        rt: Math.PI * (getRandomInt(1, 10) / 10) //density
                    })
                }
            
                this.particles = null;
                engine.rounds+=1;
            }
            console.log("Round: " + engine.rounds);
        }
        else {
            if (this.particles == null) {
                this.particles = new Particles(this.ctx, null, 0, false, this.asteroids, this.img, false);
            }
            this.particles.draw(pause);
        }
    }
}