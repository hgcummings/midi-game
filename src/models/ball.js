define(['data/constants'], function(constants) {
    return {
        init: function(paddle) {
            var self = {};
            self.released = false;
            self.x = paddle.x;
            self.y = constants.HEIGHT - constants.PADDLE.MARGIN.Y -
                        constants.PADDLE.SIZE.Y - constants.BALL.RADIUS;

            var dx = 0;
            var dy = -(constants.WIDTH / 1250);

            var updatePosition = function(delta) {
                self.x = self.x + dx * delta;
                self.y = self.y + dy * delta;

                if (self.y < constants.BORDER) {
                    self.y = (constants.BORDER - self.y) + constants.BORDER;
                    dy = -dy;
                }
            }

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
