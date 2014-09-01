define(['data/constants'], function(constants) {
    return {
        init: function(paddle) {
            var self = {};
            self.released = false;
            self.x = paddle.x;
            self.y = constants.HEIGHT - constants.PADDLE.MARGIN.Y * 3/2;

            var dx = 0;
            var dy = -(constants.WIDTH / 1250);

            self.update = function(delta, action) {
                if (self.released) {
                    self.x = self.x + dx * delta;
                    self.y = self.y + dy * delta;
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
