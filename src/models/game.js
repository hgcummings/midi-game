define(['models/fixtures', 'models/blocks', 'models/paddle', 'models/ball'], function(fixtures, blocks, paddle, ball) {
    return {
        init: function(level, input) {
            var self = {};
            var prevTime = 0;

            self.update = function(gameTime) {
                var delta = gameTime - prevTime;
                self.paddle.update(delta, input.getDirection());
                self.ball.update(delta, input.getAction());
                prevTime = gameTime;
            };
            self.fixtures = fixtures.init();
            self.blocks = blocks.init(level);
            self.paddle = paddle.init();
            self.ball = ball.init(self.paddle, self.fixtures.getCollisionPlanes()
                .concat(self.paddle.getCollisionPlanes()));

            return self;
        }
    };
});
