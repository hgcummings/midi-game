define(['data/dimensions', 'models/physics', 'models/maths', 'output/sound'], function(d, physics, maths, sound) {
    var modes = {
        REGULAR: {
            regular: true,
            speed: d.WIDTH / 3000,
            getNote: function(input) { return input.getNote(); },
            isSolid: function() { return true; },
            isSticky: function() { return false; }
        },
        EARTH: {
            speed: d.WIDTH / 3600,
            getNote: function(input) { return input.getNote(); },
            isSolid: function() { return true; },
            isSticky: function(type) { return type === 'PADDLE'; }
        },
        AIR: {
            speed: d.WIDTH / 2400,
            getNote: function() { return false; },
            isSolid: function(type) { return type !== 'BLOCK'; },
            isSticky: function() { return false; }
        },
        FIRE: {
            speed: d.WIDTH / 1800,
            getNote: function() { return true; },
            isSolid: function() { return true; },
            isSticky: function() { return false; }
        }
    };
    
    return {
        init: function(paddle, objects, input, output) {
            var self = {};
            self.alive = true;
            self.released = false;
            self.x = paddle.x;
            self.y = paddle.top - d.BALL.RADIUS;
            self.mode = modes.REGULAR;
            var radius = self.r = d.BALL.RADIUS;

            var dx = 0;
            var dy = -modes.REGULAR.speed;
            
            var updatePosition = function(delta, gameTime) {
                var newX = self.x + dx * delta;
                var newY = self.y + dy * delta;
                var collision = null;
                var sortedObjects = physics.sortByCollisionTime(objects,
                    { x: self.x, y: self.y, dx: dx, dy: dy, r: radius});
                var object;
                var maxCheckTime = delta;
                                
                while((!collision) && (object = sortedObjects.shift())) {
                    if (object.collisionTime > maxCheckTime) {
                        break;
                    }
                    
                    var previousDistanceToObject = object.distance(self);
                    var currentDistanceToObject = object.distance({ x: newX, y: newY, r: radius });

                    if (previousDistanceToObject > (-d.BALL.RADIUS) &&
                        previousDistanceToObject > currentDistanceToObject &&
                        currentDistanceToObject <= 0) {
                        var deltaToCollision =
                            delta * previousDistanceToObject / (previousDistanceToObject - currentDistanceToObject);
                        
                        newX = self.x + dx * deltaToCollision;
                        newY = self.y + dy * deltaToCollision;

                        collision = object.collideAt(newX, newY, gameTime, self.mode.getNote(input));
                        if (collision && self.mode.isSolid(object.type)) {
                            var newV = physics.reflectionV([dx, dy], collision);
                            dx = newV[0];
                            dy = newV[1];
                            if (typeof self.mode.getNote(input) === 'number') {
                                output.playBounce(sound.getMidiNote(self.mode.getNote(input)));
                            }
                        }
                        
                        if (collision && self.mode.isSticky(object.type)) {
                            self.released = false;
                            continue;
                        }

                        newX = newX + dx * (delta - deltaToCollision);
                        newY = newY + dy * (delta - deltaToCollision);
                    }
                }
                
                self.x = newX;
                self.y = newY;
            };

            self.update = function(delta, action, gameTime) {
                if (self.released) {
                    updatePosition(delta, gameTime);
                    if (self.y > d.HEIGHT) {
                        self.alive = false;
                    }
                } else {
                    self.x = paddle.x;
                }

                if (action === 'LAUNCH') {
                    self.released = true;
                } else if (modes.hasOwnProperty(action)) {
                    self.mode = modes[action];
                    var normalisedVelocity = maths.normalise([dx, dy]);
                    dx = normalisedVelocity[0] * self.mode.speed;
                    dy = normalisedVelocity[1] * self.mode.speed;
                }
            };
            return self;
        }
    };
});
