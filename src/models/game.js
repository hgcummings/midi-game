define(
    ['models/blocks', 'models/paddle', 'models/ball', 'data/constants'],
function(blocks, paddle, ball, constants) {
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
            self.blocks = blocks.load(level);
            self.paddle = paddle.init();
            self.ball = ball.init(self.paddle);

            return self;
        }
    };
});
