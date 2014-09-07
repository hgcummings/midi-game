define(['models/fixtures', 'models/blocks', 'models/paddle', 'models/ball'], function(fixtures, blocks, paddle, ball) {
    return {
        init: function(level, input, output) {
            var self = {};
            var prevTime = 0;

            self.input = input;
            self.spareLives = 3;
            self.update = function(gameTime) {
                var delta = gameTime - prevTime;
                self.paddle.update(delta, input.getDirection());
                self.ball.update(delta, input.getAction(), gameTime);
                
                if (!self.ball.alive) {
                    --self.spareLives;
                    self.ball = ball.init(self.paddle, collisionObjects, input, output);
                }
                
                prevTime = gameTime;
            };
            self.fixtures = fixtures.init();
            self.blocks = blocks.init(level, input, output);
            self.paddle = paddle.init();
            var collisionObjects = self.fixtures.getCollisionObjects()
                .concat(self.blocks.getCollisionObjects(), self.paddle.getCollisionObjects());
            self.ball = ball.init(self.paddle, collisionObjects, input, output);

            return self;
        }
    };
});
