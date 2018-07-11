class Ship {
    constructor (ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.vx = 0,
        this.vy = 0,
        this.ax = 0,
        this.ay = 0,
        this.r = 0,

        this.img = new Image();
        this.img.src = "assets/spaceship.svg";
        this.scale = 10;

        this.edges = [new Point(Math.floor(this.x - ((this.img.width / this.scale) / 2)), Math.floor(this.y - ((this.img.height / this.scale) / 2))),
            new Point(Math.floor(this.x + ((this.img.width / this.scale) / 2)), Math.floor(this.y - ((this.img.height / this.scale) / 2))),
            new Point(Math.floor(this.x - ((this.img.width / this.scale) / 2)), Math.floor(this.y + ((this.img.height / this.scale) / 2))),
            new Point(Math.floor(this.x + ((this.img.width / this.scale) / 2)), Math.floor(this.y + ((this.img.height / this.scale) / 2)))];

        this.shipCenter;
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);

        this.edges = [new Point(Math.floor(this.x - ((this.img.width / this.scale) / 2)), Math.floor(this.y - ((this.img.height / this.scale) / 2))),
                    new Point(Math.floor(this.x + ((this.img.width / this.scale) / 2)), Math.floor(this.y - ((this.img.height / this.scale) / 2))),
                    new Point(Math.floor(this.x - ((this.img.width / this.scale) / 2)), Math.floor(this.y + ((this.img.height / this.scale) / 2))),
                    new Point(Math.floor(this.x + ((this.img.width / this.scale) / 2)), Math.floor(this.y + ((this.img.height / this.scale) / 2)))];

        this.shipCenter = new Point(this.x + (((this.img.width / this.scale) / 2) * -1), (this.y + (((this.img.height / this.scale) / 2) * -1)));
        //this.ctx.imageSmoothingEnabled = "true";
        this.ctx.drawImage(this.img, ((this.img.width / this.scale) / 2) * -1, ((this.img.height / this.scale) / 2) * -1, this.img.width / this.scale, this.img.height / this.scale);

        this.ctx.restore();
    }
}