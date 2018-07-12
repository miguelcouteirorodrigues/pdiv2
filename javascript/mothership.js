class Mothership {
    constructor (ctx) {
        this.ctx = ctx;
    }

    draw() {
        this.ctx.save();

        this.ctx.strokeStyle = 'rgba(0,0,0,255)';
        this.ctx.lineWidth = 4;
        this.ctx.fillStyle = 'rgba(50,50,50,255)';

        this.ctx.beginPath();

        this.ctx.moveTo(this.ctx.canvas.width / 20, this.ctx.canvas.height + 1);
        this.ctx.lineTo(this.ctx.canvas.width / 10, this.ctx.canvas.height - (this.ctx.canvas.height / 12));
        this.ctx.lineTo(this.ctx.canvas.width - (this.ctx.canvas.width / 10), this.ctx.canvas.height - (this.ctx.canvas.height / 12));
        this.ctx.lineTo(this.ctx.canvas.width - (this.ctx.canvas.width / 20), this.ctx.canvas.height + 1);

        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();

        this.ctx.lineWidth = 1;
        this.ctx.fillStyle = "#6d4300";

        this.ctx.beginPath();

        this.ctx.moveTo(this.ctx.canvas.width / 15, this.ctx.canvas.height + 1);
        this.ctx.lineTo(this.ctx.canvas.width / 9.5, this.ctx.canvas.height - (this.ctx.canvas.height / 16));
        this.ctx.lineTo(this.ctx.canvas.width - (this.ctx.canvas.width / 9.5), this.ctx.canvas.height - (this.ctx.canvas.height / 16));
        this.ctx.lineTo(this.ctx.canvas.width - (this.ctx.canvas.width / 15), this.ctx.canvas.height + 1);

        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();

        var grd = this.ctx.createLinearGradient(this.ctx.canvas.width / 8.2, this.ctx.canvas.height - (this.ctx.canvas.height / 16), this.ctx.canvas.width - (this.ctx.canvas.width / 10), this.ctx.canvas.height - (this.ctx.canvas.height / 50));
        grd.addColorStop(0,"#0c78d6");
        grd.addColorStop(1,"#7991b7");
        this.ctx.fillStyle=grd;

        this.ctx.beginPath();

        this.ctx.moveTo(this.ctx.canvas.width / 10, this.ctx.canvas.height - (this.ctx.canvas.height / 50));
        this.ctx.lineTo(this.ctx.canvas.width / 8.2, this.ctx.canvas.height - (this.ctx.canvas.height / 16));
        this.ctx.lineTo(this.ctx.canvas.width - (this.ctx.canvas.width / 8.2), this.ctx.canvas.height - (this.ctx.canvas.height / 16));
        this.ctx.lineTo(this.ctx.canvas.width - (this.ctx.canvas.width / 10), this.ctx.canvas.height - (this.ctx.canvas.height / 50));

        this.ctx.closePath();

        this.ctx.stroke();
        this.ctx.fill();

        this.ctx.restore();
    }
}