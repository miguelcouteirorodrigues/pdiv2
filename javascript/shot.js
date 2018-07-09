class Shot {
    constructor (ctx, x, y, movesUp, isFromPlayer) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.direction = movesUp;
        this.isFromPlayer = isFromPlayer;
    }

    draw() {
        this.ctx.save();

        this.ctx.strokeStyle = "#ffffff";
        this.ctx.beginPath();

        var grd = this.ctx.createLinearGradient(0, 0, 0, 7);
        
        if (this.isFromPlayer) {
            grd.addColorStop(0, "#4ae2f9");
            grd.addColorStop(1, "#0040ba");
        }
        else {
            grd.addColorStop(0, "#f93e43");
            grd.addColorStop(1, "#9e0004");
        }

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