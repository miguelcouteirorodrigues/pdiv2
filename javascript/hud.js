class HUD {
    constructor (ctx) {
        this.ctx = ctx;

        this.img = new Image();
        this.img.src = "assets/spaceship.svg";
        this.scale = 15;

        this.lives = 10;
        this.mothershipLife = 100;
    }

    draw() {
        this.playerLives();
    }

    playerLives() {
        this.ctx.save();
        this.ctx.translate((canvas.width / 40), canvas.height / 20);
        var shipCenter = new Point(((this.img.width / this.scale) / 2) * -1, (((this.img.height / this.scale) / 2) * -1));
        
        for (var i = 1; i <= this.lives; i++) {
            if (i % 2 != 0) {
                
                this.ctx.drawImage(this.img, shipCenter.x, shipCenter.y, this.img.width / (this.scale * 2), this.img.height / (this.scale * 2));
            }
            else {
                this.ctx.drawImage(this.img, shipCenter.x, shipCenter.y, this.img.width / this.scale, this.img.height / this.scale);
            }

            this.ctx.translate(this.img.width / this.scale, 0);
        }

        this.ctx.restore();
    }
}