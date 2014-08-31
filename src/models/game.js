define(['models/level', 'data/constants'], function(loader, constants) {
    return {
        init: function(level, input) {
            var self = {};
            var prevTime = 0;

            var leftBound = constants.PADDLE.MARGIN.X + constants.PADDLE.SIZE.X / 2;
            var rightBound = constants.WIDTH - constants.PADDLE.MARGIN.X - constants.PADDLE.SIZE.X / 2;

            self.update = function(gameTime) {
                self.paddle.x += input.getDirection() * self.paddle.speed * (gameTime - prevTime);

                if (self.paddle.x < leftBound) {
                    self.paddle.x = leftBound;
                } else if (self.paddle.x > rightBound) {
                    self.paddle.x = rightBound;
                }

                prevTime = gameTime;
            };
            self.blocks = loader.load(level);
            self.paddle = {
                x: constants.WIDTH / 2,
                speed: constants.WIDTH / 4000
            }

            return self;
        }
    };
});
