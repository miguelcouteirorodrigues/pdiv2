function handleControls (keys) {
    if (!engine.isGameOver) {
        //M
        if(keys[77]) {
            if (engine.canChangeMute != engine.mute) {
                engine.mute = !engine.mute;
            }
        }
        else if (!keys[77]) {
            engine.canChangeMute = !engine.mute;
        }

        //P
        if(keys[80]) {
            if (engine.canChangePause != engine.pause) {
                engine.pause = !engine.pause;
                if (!engine.mute) {
                    soundEffect("pause");
                }
            }
        }
        else if (!keys[80]) {
            engine.canChangePause = !engine.pause;
        }

        if (!engine.pause) {
            //Spacebar
            if(keys[32]) {
                if (engine.canShoot) {
                    let shot = new Shot(engine.context, engine.ship.x, engine.ship.y - 10, true, true);
                    engine.shipShots.push(shot);
                    engine.canShoot = false;
                    if (!engine.mute) {
                        soundEffect("shot");
                    }
                }
            }
            else if (!keys[32]) {
                engine.canShoot = true;
            }

            //NAVIGATION
            //Left arrow key
            if(keys[37]) {
                if (engine.ship.vx > engine.maxVelocity * -1) {
                    if (engine.ship.ax > 0) {
                        engine.ship.ax = engine.accelerationFactor * -1 * engine.breakingFactor;
                        calculateFriction(engine.ship);
                    }
                    else {
                        engine.ship.ax = engine.accelerationFactor * -1;
                    }
                }
                else {
                    engine.ship.ax = 0;
                }
            }
            //Right arrow key
            if(keys[39]) {
                if (engine.ship.vx < engine.maxVelocity) {
                    if (engine.ship.ax < 0) {
                        engine.ship.ax = engine.accelerationFactor * engine.breakingFactor;
                        calculateFriction(engine.ship);
                    }
                    else {
                        engine.ship.ax = engine.accelerationFactor;
                    }
                }
                else {
                    engine.ship.ax = 0;
                }
            }
            if ((keys[37] && keys[39]) || (!keys[37] && !keys[39])) {
                engine.ship.ax = 0;
                calculateFriction(engine.ship);
            }
            
            if (engine.ship.edges[0].x <= engine.bottomLeftEdge.x || engine.ship.edges[1].x >= engine.bottomRightEdge.x) {
                engine.ship.ax = engine.ship.ax * -1;
                engine.ship.vx = engine.ship.vx * -1;
            }
        }
    }
}