define(['models/fixtures', 'models/blocks', 'models/paddle', 'models/ball'], function(fixtures, blocks, paddle, ball) {
    return {
        init: function(level, input) {
            var self = {};
            var prevTime = 0;

            self.spareLives = 3;
            self.update = function(gameTime) {
                var delta = gameTime - prevTime;
                self.paddle.update(delta, input.getDirection());
                self.ball.update(delta, input.getAction());
                
                if (!self.ball.alive) {
                    --self.spareLives;
                    self.ball = ball.init(self.paddle, collisionObjects);
                }
                
                prevTime = gameTime;
            };
            self.fixtures = fixtures.init();
            self.blocks = blocks.init(level);
            self.paddle = paddle.init();
            var collisionObjects = self.fixtures.getCollisionObjects()
                .concat(self.blocks.getCollisionObjects(), self.paddle.getCollisionObjects());
            self.ball = ball.init(self.paddle, collisionObjects);

            return self;
        }
    };
});
