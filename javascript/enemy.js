class Enemy {
    constructor (ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        
        this.img = new Image();
        this.img.src = "assets/spaceship.svg";
        this.scale = 10;

        this.edges = [new Point(Math.floor(this.x - ((this.img.width / this.scale) / 2)), Math.floor(this.y - ((this.img.height / this.scale) / 2))),
            new Point(Math.floor(this.x + ((this.img.width / this.scale) / 2)), Math.floor(this.y - ((this.img.height / this.scale) / 2))),
            new Point(Math.floor(this.x - ((this.img.width / this.scale) / 2)), Math.floor(this.y + ((this.img.height / this.scale) / 2))),
            new Point(Math.floor(this.x + ((this.img.width / this.scale) / 2)), Math.floor(this.y + ((this.img.height / this.scale) / 2)))];
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(Math.PI);

        var enemyCenter = new Point(((this.img.width / this.scale) / 2) * -1, (((this.img.height / this.scale) / 2) * -1));
        this.ctx.imageSmoothingEnabled = "true";
        this.ctx.drawImage(this.img, enemyCenter.x, enemyCenter.y, this.img.width / this.scale, this.img.height / this.scale);

        this.ctx.restore();
    }
}