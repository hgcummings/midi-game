define(['data/constants', 'models/physics'], function(constants, physics) {
    return {
        init: function(paddle, planes) {
            var self = {};
            self.alive = true;
            self.released = false;
            self.x = paddle.x;
            self.y = paddle.top - constants.BALL.RADIUS;

            var dx = 0;
            var dy = -(constants.WIDTH / 1250);
            
            var updatePosition = function(delta) {
                var newX = self.x + dx * delta;
                var newY = self.y + dy * delta;
                
                var plane = physics.nextCollisionPlane(planes, { x: self.x, y: self.y, dx: dx, dy: dy});
                
                if (plane !== null) {
                    var previousDistanceToPlane = physics.distanceToPlane(plane, self);
                    var currentDistanceToPlane = physics.distanceToPlane(plane, { x: newX, y: newY});

                    if (previousDistanceToPlane > 0 && currentDistanceToPlane <= 0) {
                        var deltaToCollision =
                            delta * previousDistanceToPlane / (previousDistanceToPlane - currentDistanceToPlane);
                        newX = self.x + dx * deltaToCollision;
                        newY = self.y + dy * deltaToCollision;

                        var normal = plane.collideAt(newX);
                        if (normal) {
                            var newV = physics.reflectionV([dx, dy], normal);
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
