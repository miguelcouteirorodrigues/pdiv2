class Shot {
    constructor(ctx, x, y, movesUp) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.direction = movesUp;
    }

    draw() {
        this.ctx.save();

        this.ctx.strokeStyle = "#ffffff";
        this.ctx.beginPath();

        var grd = this.ctx.createLinearGradient(0, 0, 0, 7);
        grd.addColorStop(0, "#4ae2f9");
        grd.addColorStop(1, "#0040ba");

        this.ctx.fillStyle = grd;

        this.ctx.translate(this.x, this.y);

        this.ctx.ellipse(0, 0, 2, 7, 0, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.restore();
        this.update();
    }

    update() {
        if (this.direction) {
            this.y -= 5;
        }
        else {
            this.y += 5;
        }
    }
}