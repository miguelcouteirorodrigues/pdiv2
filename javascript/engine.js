class Engine {
    constructor () {
        this.x;
        this.y;
        this.ship;
        this.background;
        this.hud;

        this.debug = false;
        this.pause = false;
        this.counter = 0;
        this.accelerationFactor = 0.25;
        this.breakingFactor = 10;
        this.maxVelocity = 8;
        
        this.tempPause = true;
        this.pause = false;

        this.tempShot = false;
        this.shipShots = [];
        this.asteroids = [];

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
        
        //P
        if(this.keys[80]) {
            if (this.tempPause != this.pause) {
                this.pause = !this.pause;
            }
        }
        else if (!this.keys[80]) {
            this.tempPause = !this.pause;
        }

        if (!this.pause) {
            //Spacebar
            if(this.keys[32]) {
                if (this.tempShot) {
                    let shot = new Shot(context, this.ship.x, this.ship.y - 10, true, true);
                    this.shipShots.push(shot);
                    this.tempShot = false;
                }
            }
            else if (!this.keys[32]) {
                this.tempShot = true;
            }

            //NAVIGATION
            //Left arrow key
            if(this.keys[37]) {
                if (this.ship.vx > this.maxVelocity * -1) {
                    if (this.ship.ax > 0) {
                        this.ship.ax = this.accelerationFactor * -1 * this.breakingFactor;
                        calculateFriction(this.ship);
                    }
                    else {
                        this.ship.ax = this.accelerationFactor * -1;
                    }
                }
                else {
                    this.ship.ax = 0;
                }
            }
            //Right arrow key
            if(this.keys[39]) {
                if (this.ship.vx < this.maxVelocity) {
                    if (this.ship.ax < 0) {
                        this.ship.ax = this.accelerationFactor * this.breakingFactor;
                        calculateFriction(this.ship);
                    }
                    else {
                        this.ship.ax = this.accelerationFactor;
                    }
                }
                else {
                    this.ship.ax = 0;
                }
            }
            if ((this.keys[37] && this.keys[39]) || (!this.keys[37] && !this.keys[39])) {
                this.ship.ax = 0;
                calculateFriction(this.ship);
            }
            
            if (this.ship.edges[0].x <= this.bottomLeftEdge.x || this.ship.edges[1].x >= this.bottomRightEdge.x) {
                this.ship.ax = this.ship.ax * -1;
                this.ship.vx = this.ship.vx * -1;
            }
        }

        this.background.draw(this.pause);
        updatePosition(this.ship);
        this.ship.draw(this.debug);

        this.hud.draw();

        engine.handleShots(context);
        /* END GAME CODE */

        context.closePath();

        if(this.pause) {
            engine.drawPauseIcon(context);
        }

        if (!this.pause) {
            this.counter++;
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

    handleShots(ctx) {
        let tempShipShots = [];
        
        for (var i = 0; i < this.shipShots.length; i++) {
            let shot = this.shipShots[i];

            if (shot.y > 0) {
                tempShipShots.push(shot);
            }

            shot.draw();
        }

        this.shipShots = [];

        for (var i = 0; i < tempShipShots.length; i++) {
            this.shipShots.push(tempShipShots[i]);
        }
    }

    handleAsteroids() {
        let variance = 1;

        for (var i = 1; i <= variance; i++) {

        }
    }
}