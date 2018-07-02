class Engine {
    constructor () {
        var x;
        var y;
        var ship;
        var background;

        var debug = false;
        var pause = false;
        var counter = 0;
        var accelerationFactor = 0.25;
        var breakingFactor = 10;
        var maxVelocity = 8;

        //event listeners
        var keys = [];
        document.addEventListener('keydown', function(e){
            keys[e.which] = true;
        });
        document.addEventListener('keyup', function(e){
            keys[e.which] = false;
        });

        this.initialize = function() {
            var canvas = document.getElementById("canvas");
            canvas.focus();
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            x = Math.floor(canvas.width / 2);
            y = Math.floor(canvas.height  - (canvas.height / 7));
            var context = canvas.getContext('2d');

            background = new Background(context);
            ship = new Ship(context, x, y);

            animate(canvas, context);
        }

        var animate = function(canvas, context) {
            requestAnimationFrame(function() {
                animate(canvas, context);
            });
            
            context.clearRect(0, 0, innerWidth, innerHeight);
            context.beginPath();

            background.draw();

            /*game code*/
            if(keys[37]) {
                if (ship.vx > maxVelocity * -1) {
                    if (ship.ax > 0) {
                        ship.ax = accelerationFactor * -1 * breakingFactor;
                        calculateFriction(ship);
                    }
                    else {
                        ship.ax = accelerationFactor * -1;
                    }
                }
                else {
                    ship.ax = 0;
                }
            }
            else if(keys[39]) {
                if (ship.vx < maxVelocity) {
                    if (ship.ax < 0) {
                        ship.ax = accelerationFactor * breakingFactor;
                        calculateFriction(ship);
                    }
                    else {
                        ship.ax = accelerationFactor;
                    }
                }
                else {
                    ship.ax = 0;
                }
            }
            else if (!keys[37] || !keys[39]) {
                ship.ax = 0;
                calculateFriction(ship);
            }

            updatePosition(ship);
            ship.draw(debug);
            /*end game code*/

            context.closePath();

            if(pause) {
                engine.drawPauseIcon(context);
            }

            if (!pause) {
                counter++;
            }
        }

        this.drawPauseIcon = function(ctx) {
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
    }
}