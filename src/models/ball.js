define(['data/constants', 'models/physics'], function(constants, physics) {
    return {
        init: function(paddle, objects) {
            var self = {};
            self.alive = true;
            self.released = false;
            self.x = paddle.x;
            self.y = paddle.top - constants.BALL.RADIUS;
            var radius = self.r = constants.BALL.RADIUS;

            var speed = constants.WIDTH / 2500;
            var dx = 0;
            var dy = -speed;
            
            var updatePosition = function(delta) {
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

                    if (previousDistanceToObject > (-constants.BALL.RADIUS) &&
                        previousDistanceToObject > currentDistanceToObject &&
                        currentDistanceToObject <= 0) {
                        var deltaToCollision =
                            delta * previousDistanceToObject / (previousDistanceToObject - currentDistanceToObject);
                        
                        newX = self.x + dx * deltaToCollision;
                        newY = self.y + dy * deltaToCollision;

                        collision = object.collideAt(newX, newY);
                        if (collision) {
                            var newV = physics.reflectionV([dx, dy], collision);
                            dx = newV[0];
                            dy = newV[1];
                        }

                        newX = newX + dx * (delta - deltaToCollision);
                        newY = newY + dy * (delta - deltaToCollision);
                    }
                }
                
                self.x = newX;
                self.y = newY;
            };

            self.update = function(delta, action) {
                if (self.released) {
                    updatePosition(delta);
                    if (self.y > constants.HEIGHT) {
                        self.alive = false;
                    }
                } else {
                    self.x = paddle.x;
                }

                if (action === 'LAUNCH') {
                    self.released = true;
                }
            };
            return self;
        }
    };
});
