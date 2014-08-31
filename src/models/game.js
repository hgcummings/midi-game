define(['models/blocks', 'models/paddle', 'data/constants'], function(blocks, paddle, constants) {
    return {
        init: function(level, input) {
            var self = {};
            var prevTime = 0;

            self.update = function(gameTime) {
                var delta = gameTime - prevTime;
                self.paddle.update(delta, input.getDirection());
                prevTime = gameTime;
            };
            self.blocks = blocks.load(level);
            self.paddle = paddle.init();

            return self;
        }
    };
});
