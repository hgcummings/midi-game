define(['data/constants'], function(constants) {
    return {
        init: function() {
            var self = {};
            var speed = constants.WIDTH / 2500;
            var leftBound = constants.PADDLE.MARGIN.X + constants.PADDLE.SIZE.X / 2;
            var rightBound = constants.WIDTH - constants.PADDLE.MARGIN.X - constants.PADDLE.SIZE.X / 2;

            self.update = function(delta, direction) {
                self.x += direction * speed * delta;

                if (self.x < leftBound) {
                    self.x = leftBound;
                } else if (self.x > rightBound) {
                    self.x = rightBound;
                }
            };

            self.x = constants.WIDTH / 2;

            return self;
        }
    }
});
