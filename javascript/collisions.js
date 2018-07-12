function handleCollision() {
    let asteroids = engine.asteroids.asteroids;
    let asteroidImg = engine.asteroids.img;
    let shipImg = engine.ship.img;
    let ship = engine.ship;
    let shipShots = engine.shipShots;

    handleShipShots(shipShots);

    asteroidCollisions(ship, asteroids, asteroidImg, shipShots);
}

function asteroidCollisions(ship, asteroids, asteroidImg, shipShots) {
    let asteroidsOriginalLength = asteroids.length;
    
    for (var i = 0; i < asteroids.length; i ++) {
        let asteroid = asteroids[i];
        
        let asteroidEdges = [
            //top left
            new Point(Math.floor(asteroid.x - ((asteroidImg.width * asteroid.r) / 2)), Math.floor(asteroid.y - ((asteroidImg.height * asteroid.r) / 2))),
            //top right
            new Point(Math.floor(asteroid.x + ((asteroidImg.width * asteroid.r) / 2)), Math.floor(asteroid.y - ((asteroidImg.height * asteroid.r) / 2))),
            //lower left
            new Point(Math.floor(asteroid.x - ((asteroidImg.width * asteroid.r) / 2)), Math.floor(asteroid.y + ((asteroidImg.height * asteroid.r) / 2))),
            //lower right
            new Point(Math.floor(asteroid.x + ((asteroidImg.width * asteroid.r) / 2)), Math.floor(asteroid.y + ((asteroidImg.height * asteroid.r) / 2)))];

        //ship collisions
        if (isIntersecting(asteroidEdges[2], asteroidEdges[3], ship.edges[0], ship.edges[1])) {
            console.log("asteroid has hit ship.");
            engine.lives--;
            asteroids.splice(i, 1);
            soundEffect("ship");
        }

        //mothership collisions
        let motherShipLeftPoint = new Point(Math.floor(engine.context.canvas.width / 10), Math.floor(engine.context.canvas.height - (engine.context.canvas.height / 12)));
        let motherShipRightPoint = new Point(Math.floor(engine.context.canvas.width - (engine.context.canvas.width / 10)), Math.floor(engine.context.canvas.height - (engine.context.canvas.height / 12)));
        
        //left and right outer edges
        let motherShipLeftmostPoint = new Point(Math.floor(engine.context.canvas.width / 20), Math.floor(engine.context.canvas.height + 1));
        let motherShipRightmostPoint = new Point(Math.floor(engine.context.canvas.width - (engine.context.canvas.width / 20)), Math.floor(engine.context.canvas.height + 1));

        if (isIntersecting(asteroidEdges[2], asteroidEdges[3], motherShipLeftPoint, motherShipRightPoint) ||
            isIntersecting(asteroidEdges[2], asteroidEdges[3], motherShipLeftmostPoint, motherShipLeftPoint) ||
            isIntersecting(asteroidEdges[2], asteroidEdges[3], motherShipRightPoint, motherShipRightmostPoint)) {
            console.log("asteroid has hit mothership.");
            engine.mothershipLife -= 2.5;
            asteroids.splice(i, 1);
            soundEffect("ship");
        }

        //shot collisions
        for (var j = 0; j < shipShots.length; j++) {
            let shot = shipShots[j];
            let shotPoint = new Point(shot.x, shot.y);

            if (isIntersecting(asteroidEdges[2], asteroidEdges[3], shotPoint, shotPoint)) {
                asteroids.splice(i, 1);
                shipShots.splice(j, 1);
                engine.score += 100;
                soundEffect("asteroid");
            }
            else if (shot.y < 0) {
                shipShots.splice(j, 1);
            }
        }

        if (engine.lives <= 0 || engine.mothershipLife <= 0) {
            engine.isGameOver = true;
        }
    }

    if(engine.powerUp) {
        for (var j = 0; j < shipShots.length; j++) {
            let shot = shipShots[j];
            let shotPoint = new Point(shot.x, shot.y);
            
            if (isIntersecting(engine.powerUpEdges[2], engine.powerUpEdges[3], shotPoint, shotPoint)) {
                engine.lives += 2.5;
                if(engine.lives > 10) {
                    engine.lives = 10;
                }

                engine.mothershipLife += 25;
                if (engine.mothershipLife > 100) {
                    engine.mothershipLife = 100;
                }

                engine.powerUp = false;
                shipShots.splice(j, 1);
                soundEffect("powerup");
            }
            else if (shot.y < 0) {
                shipShots.splice(j, 1);
            }
        }
    }

    if (asteroids.length != asteroidsOriginalLength) {
        engine.asteroids.particles = null;
    }
}

function handleShipShots(shipShots) {
    for (var i = 0; i < shipShots.length; i++) {
        let shot = shipShots[i];
        shot.draw();
    }
}