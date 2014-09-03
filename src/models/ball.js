define(['data/constants', 'models/physics'], function(constants, physics) {
    return {
        init: function(paddle) {
            var self = {};
            self.alive = true;
            self.released = false;
            self.x = paddle.x;
            self.y = paddle.top - constants.BALL.RADIUS;

            var dx = 0;
            var dy = -(constants.WIDTH / 1250);

            var topBound = constants.BORDER + constants.BALL.RADIUS;
            var leftBound = constants.BORDER + constants.BALL.RADIUS;
            var rightBound = constants.WIDTH - constants.BORDER - constants.BALL.RADIUS;

            var updatePosition = function(delta) {
                var newX = self.x + dx * delta;
                var newY = self.y + dy * delta;

                if (newY < topBound) {
                    newY = (topBound - newY) + topBound;
                    dy = -dy;
                }

                if (newX > rightBound) {
                    newX = rightBound - (newX - rightBound);
                    dx = -dx;
                } else if (newX < leftBound) {
                    newX = (leftBound - newX) + leftBound;
                    dx = -dx;
                }

                if (newY > paddle.top && self.alive) {
                    var deltaToCollision = (paddle.top - self.y) / dy;
                    newX = self.x + dx * deltaToCollision;
                    newY = paddle.top;

                    var normal = paddle.getNormalAt(newX);
                    if (normal) {
                        var newV = physics.reflectionV([dx, dy], normal);
                        dx = newV[0];
                        dy = newV[1];
                    } else {
                        self.alive = false;
                    }

                    delta = delta - deltaToCollision;
                    newX = newX + dx * delta;
                    newY = newY + dy * delta;
                }

                self.x = newX;
                self.y = newY;
            };

            self.update = function(delta, action) {
                if (self.released) {
                    updatePosition(delta);
                } else {
                    self.x = paddle.x;
                }

                if (action === 'LAUNCH') {
                    self.released = true;
                }
            }
            return self;
        }
    };
});
