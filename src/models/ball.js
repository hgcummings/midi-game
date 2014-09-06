define(['data/constants', 'models/physics'], function(constants, physics) {
    return {
        init: function(paddle, objects) {
            var self = {};
            self.alive = true;
            self.released = false;
            self.x = paddle.x;
            self.y = paddle.top - constants.BALL.RADIUS;

            var speed = constants.WIDTH / 2500;
            var dx = 0;
            var dy = -speed;
            
            var updatePosition = function(delta) {
                var newX = self.x + dx * delta;
                var newY = self.y + dy * delta;
                var collision = null;
                var sortedObjects = physics.sortByCollisionTime(objects, { x: self.x, y: self.y, dx: dx, dy: dy});
                var object;
                var maxCheckTime = delta + constants.BALL.RADIUS / speed;
                                
                while((!collision) && (object = sortedObjects.shift())) {
//                    if (object.collisionTime > maxCheckTime) {
//                        break;
//                    }
                    
                    var previousDistanceToObject =
                        object.distance(self) - constants.BALL.RADIUS;
                    var currentDistanceToPlane =
                        object.distance({ x: newX, y: newY}) - constants.BALL.RADIUS;

                    if (previousDistanceToObject > 0 && currentDistanceToPlane <= 0) {
                        var deltaToCollision =
                            delta * previousDistanceToObject / (previousDistanceToObject - currentDistanceToPlane);
                        
                        newX = self.x + dx * deltaToCollision;
                        newY = self.y + dy * deltaToCollision;

                        if (collision = object.collideAt(newX, newY)) {
                            var newV = physics.reflectionV([dx, dy], collision);
                            dx = newV[0];
                            dy = newV[1];
                        }

                        newX = newX + dx * delta;
                        newY = newY + dy * delta;
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
