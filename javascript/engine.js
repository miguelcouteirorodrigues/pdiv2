class Engine {
    constructor () {
        this.x;
        this.y;
        this.ship;
        this.mothership;
        this.background;
        this.hud;
        this.asteroids;

        this.powerUpEdges;

        this.lives = 10;
        this.mothershipLife = 100;
        this.score = 0;

        this.isGameOver = false;
        this.rounds = 0;
        
        this.powerUp = false;
        this.powerUpScale = 7;
        this.powerUpAngle = 0;

        this.accelerationFactor = 0.25;
        this.breakingFactor = 12;
        this.maxVelocity = 8;
        
        this.canChangePause = true;
        this.pause = false;

        this.canChangeMute = true;
        this.mute = false;

        this.canShoot = false;
        this.shipShots = [];

        //screen edges
        this.topLeftEdge;
        this.topRightEdge;
        this.bottomLeftEdge;
        this.bottomRightEdge;

        //event listeners
        this.keys = [];
        document.addEventListener('keydown', function(e){
            engine.keys[e.which] = true;
        });
        document.addEventListener('keyup', function(e){
            engine.keys[e.which] = false;
        });
    }

    initialize() {
        this.canvas = document.getElementById("canvas");
        this.canvas.focus();
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.x = Math.floor(canvas.width / 2);
        this.y = Math.floor(canvas.height  - (canvas.height / 7));
        this.context = canvas.getContext('2d');

        this.topLeftEdge = new Point(canvas.width / 20, canvas.height / 20);
        this.topRightEdge = new Point(canvas.width - (canvas.width / 20), canvas.height / 20);
        this.bottomLeftEdge = new Point(canvas.width / 20, canvas.height - (canvas.height / 20));
        this.bottomRightEdge = new Point(canvas.width - (canvas.width / 20), canvas.height - (canvas.height / 20));

        this.background = new Background(this.context);
        this.ship = new Ship(this.context, this.x, this.y);
        this.mothership = new Mothership(this.context);
        this.asteroids = new Asteroids(this.context);
        this.hud = new HUD(this.context);

        this.animate(this.canvas, this.context);
    }

    animate(canvas, context) {
        requestAnimationFrame(function() {
            engine.animate(canvas, context);
        });
        
        context.clearRect(0, 0, innerWidth, innerHeight);
        context.beginPath();

        /* GAME CODE */
        handleControls(this.keys, this.isGameOver);
        
        if (!this.pause && !this.isGameOver) {
            updatePosition(this.ship);
        }

        this.background.draw(this.pause);
        
        if (!this.isGameOver) {
            this.ship.draw();
            this.mothership.draw();
            this.asteroids.draw(this.pause);

            if(this.powerUp) {
                this.drawPowerUp(context);
            }

            this.hud.draw();
        }

        if (!this.pause && !this.isGameOver) {
            handleCollision(this.counter);
        }

        if (this.isGameOver) {
            engine.drawGameOverScreen(context);
        }

        /* END GAME CODE */

        context.closePath();

        if(this.pause) {
            engine.drawPauseIcon(context);
        }
    }

    drawPauseIcon(ctx) {
        ctx.beginPath()
        ctx.fillStyle = "#44444499";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        ctx.fillStyle = "#ffffffff";
        ctx.fillRect(ctx.canvas.width / 2 - 30, ctx.canvas.height / 2 - 40, 20, 80);
        ctx.fillRect(ctx.canvas.width / 2 + 10, ctx.canvas.height / 2 - 40, 20, 80);

        ctx.strokeStyle = "#000000ff";
        ctx.strokeRect(ctx.canvas.width / 2 - 30, ctx.canvas.height / 2 - 40, 20, 80);
        ctx.strokeRect(ctx.canvas.width / 2 + 10, ctx.canvas.height / 2 - 40, 20, 80);
        ctx.closePath();
    }

    drawGameOverScreen(ctx) {
        
        ctx.beginPath()
        ctx.fillStyle = "#44444499";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.fillStyle = "#ffffff";
        ctx.font = "120px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Game Over", ctx.canvas.width / 2, ctx.canvas.height / 2); 
    }

    drawPowerUp(ctx) {
        ctx.save();
        let x = ctx.canvas.width / 2;
        let y = ctx.canvas.height / 2;
        ctx.translate(x, y);
        ctx.rotate(this.powerUpAngle);

        if (!this.pause) {
            this.powerUpAngle += 0.01;
        }

        let img = this.ship.img;

        this.powerUpEdges = [new Point(Math.floor(x - ((img.width / this.powerUpScale) / 2)), Math.floor(y - ((img.height / this.powerUpScale) / 2))),
            new Point(Math.floor(x + ((img.width / this.powerUpScale) / 2)), Math.floor(y - ((img.height / this.powerUpScale) / 2))),
            new Point(Math.floor(x - ((img.width / this.powerUpScale) / 2)), Math.floor(y + ((img.height / this.powerUpScale) / 2))),
            new Point(Math.floor(x + ((img.width / this.powerUpScale) / 2)), Math.floor(y + ((img.height / this.powerUpScale) / 2)))];

        ctx.drawImage(img, ((img.width / this.powerUpScale) / 2) * -1, ((img.height / this.powerUpScale) / 2) * -1, img.width / this.powerUpScale, img.height / this.powerUpScale);

        ctx.restore();
    }
}