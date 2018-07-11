class HUD {
    constructor (ctx) {
        this.ctx = ctx;

        this.img = new Image();
        this.img.src = "assets/spaceship.svg";
        this.scale = 20;
        this.iconCenter = new Point(((this.img.width / this.scale) / 2) * -1, (((this.img.height / this.scale) / 2) * -1));
    }

    draw() {
        this.background();
        this.drawPlayerLives();
        this.drawMothershipLife();
        this.drawScore();
    }

    background() {
        this.ctx.save();

        this.ctx.translate(canvas.width / 70, canvas.height / 35);

        this.ctx.fillStyle = 'rgba(255,255,255,0.3)';
        this.ctx.fillRect(0,0, (this.img.width / this.scale) * 10.5, (this.img.height / this.scale) * 2.5);

        this.ctx.restore();
    }

    drawPlayerLives() {
        this.ctx.save();
        this.ctx.translate(canvas.width / 40, canvas.height / 20);
        
        for (var i = 1; i <= engine.lives; i++) {
            if (i % 2 != 0) {
                this.ctx.scale(0.5, 0.5);
                this.ctx.drawImage(this.img, this.iconCenter.x, this.iconCenter.y, this.img.width / this.scale, this.img.height / this.scale);
            }
            else {
                this.ctx.scale(2, 2);
                this.ctx.drawImage(this.img, this.iconCenter.x, this.iconCenter.y, this.img.width / this.scale, this.img.height / this.scale);
                this.ctx.translate(this.img.width / (this.scale * 0.5), 0);
            }
        }

        this.ctx.restore();
    }

    drawMothershipLife() {
        this.ctx.save();
        this.ctx.translate(canvas.width / 60, canvas.height / 12);

        this.ctx.strokeStyle = "white";
        this.ctx.fillStyle = 'hsla(' + engine.mothershipLife + ', 100%, 50%, 1)';

        this.ctx.strokeRect(0, 0, (this.img.width / this.scale) * 10, (this.img.height / this.scale) / 8);
        this.ctx.fillRect(0, 0, ((this.img.width / this.scale) * 10) * (engine.mothershipLife / 100), (this.img.height / this.scale) / 8);

        this.ctx.restore();
    }

    drawScore() {
        this.ctx.save();
        this.ctx.translate(canvas.width / 60, canvas.height / 11);
        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";

        let _score = String(engine.score);

        while (_score.length < 10) {
            _score = "0" + _score;
        }

        this.ctx.fillText(_score, canvas.width / 9.5, canvas.height / 50);
        this.ctx.restore();
    }
}