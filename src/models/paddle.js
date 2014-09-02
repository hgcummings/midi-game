define(['data/constants'], function(constants) {
    return {
        init: function() {
            var self = {};
            var speed = constants.WIDTH / 2500;
            var leftBound = constants.PADDLE.MARGIN.X + constants.PADDLE.SIZE.X / 2;
            var rightBound = constants.WIDTH - constants.PADDLE.MARGIN.X - constants.PADDLE.SIZE.X / 2;
            var width = constants.PADDLE.SIZE.X;

            self.update = function(delta, direction) {
                self.x += direction * speed * delta;

                if (self.x < leftBound) {
                    self.x = leftBound;
                } else if (self.x > rightBound) {
                    self.x = rightBound;
                }
            };

            self.getNormalAt = function(x) {
                if ((x >= self.x - width / 2) && (x <= self.x + width / 2)) {
                    var offset = (x - self.x) / (constants.PADDLE.SIZE.X / 2);
                    var angle = 0.75 * offset * offset * offset;
                    return [Math.sin(angle), -Math.cos(angle)]
                } else {
                    return null;
                }
            }

            self.x = constants.WIDTH / 2;
            self.top = constants.HEIGHT - constants.PADDLE.MARGIN.Y - constants.PADDLE.SIZE.Y;

            return self;
        }
    }
});
